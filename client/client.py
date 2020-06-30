import argparse
import random
import time

import requests
from requests.packages.urllib3.exceptions import InsecureRequestWarning

from utils import modulo_pow, modulo_multiply, modinv


requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
SERVER_URL = "https://localhost:3000"


def get_group_info(group_id):
    return requests.get(f"{SERVER_URL}/group/{group_id}", verify=False,).json()


def create_group(group_capacity):
    response = requests.post(
        f"{SERVER_URL}/group",
        data={"question": "Can we have a doggo in house?", "n": group_capacity},
        verify=False,
    ).json()

    return response["id"]


def join_group(group_id):
    response = get_group_info(group_id)

    group = response["group"]
    x_i = random.randint(0, group["q"] - 1)
    g_x_i = modulo_pow(group["g"], x_i, group["p"])

    response = requests.post(
        f"{SERVER_URL}/group/{group_id}/join", data={"pubKey": g_x_i}, verify=False,
    )
    return x_i, g_x_i, group["p"], group["q"]


def check_first_round_ended(group_id):
    response = get_group_info(group_id)
    while len(response["publicKeys"]) != int(response["n"]):
        time.sleep(1)
        response = get_group_info(group_id)
    return response["publicKeys"]


def send_answer(group_id, answer, public_keys, user_index, p, q, x_i):
    g_y_i = modulo_multiply(public_keys[:user_index], p) * modinv(
        modulo_multiply(public_keys[user_index + 1 :], p), p
    )
    # if veto
    if answer == 1:
        exponent = random.randint(0, q - 1)
    else:
        exponent = x_i

    # (g^{y_i})^
    g_c_i_y_i = modulo_pow(g_y_i, exponent, p)

    requests.post(
        f"{SERVER_URL}/group/{group_id}/vote", data={"vote": g_c_i_y_i}, verify=False,
    )


def check_second_round_ended(group_id):
    response = get_group_info(group_id)
    while len(response["answers"]) != int(response["n"]):
        time.sleep(1)
        response = get_group_info(group_id)
    return response["answers"]


def get_result(answers, p):
    return modulo_multiply(answers, p)


def main(create, group_capacity=None, group_id=None, answer=None):
    if create:
        print(create_group(group_capacity))
    else:
        x_i, g_x_i, p, q = join_group(group_id)
        public_keys = check_first_round_ended(group_id)
        user_index = public_keys.index(g_x_i)
        send_answer(group_id, answer, public_keys, user_index, p, q, x_i)
        answers = check_second_round_ended(group_id)
        result = get_result(answers, p)
        if result == 1:
            print("All agreed")
        else:
            print("Someone vetoed")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Client configuration for av-nets")
    parser.add_argument("--create", type=bool, default=False)
    parser.add_argument("--group_capacity", type=int)
    parser.add_argument("--group_id", type=int)
    parser.add_argument("--answer", type=int)

    args = parser.parse_args()
    main(args.create, args.group_capacity, args.group_id, args.answer)
