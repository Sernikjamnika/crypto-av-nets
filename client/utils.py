import requests


def modulo_pow(base, exponent, modulo):
    result = 1
    for _ in range(exponent):
        result = (result * base) % modulo
    return result


def modulo_multiply(array, modulo):
    result = 1
    for element in array:
        result = (result * element) % modulo
    return result


def egcd(a, b):
    if a == 0:
        return (b, 0, 1)
    else:
        g, y, x = egcd(b % a, a)
        return (g, x - (b // a) * y, y)


def modinv(a, m):
    g, x, y = egcd(a, m)
    if g != 1:
        raise Exception("modular inverse does not exist")
    else:
        return x % m
