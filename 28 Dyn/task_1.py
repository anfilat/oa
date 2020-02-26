import re


def even(x):
    return (x & 1) == 0


def odd(x):
    return (x & 1) == 1


def gcd(a, b):
    if a == b:
        return a
    if a == 0:
        return b
    if b == 0:
        return a
    if even(a) and even(b):
        return 2 * gcd(a // 2, b // 2)
    if even(a) and odd(b):
        return gcd(a // 2, b)
    if odd(a) and even(b):
        return gcd(a, b // 2)
    if a > b:
        return gcd((a - b) // 2, b)
    return gcd(a, (b - a) // 2)


def main(line):
    groups = re.match('(\d+)/(\d+)\+(\d+)/(\d+)', line).groups()
    a = int(groups[0])
    b = int(groups[1])
    c = int(groups[2])
    d = int(groups[3])

    x = a * d + c * b
    y = b * d
    g = gcd(x, y)
    x //= g
    y //= g

    return '%s/%s' % (x, y)


# line = input()
# print(main(line))
