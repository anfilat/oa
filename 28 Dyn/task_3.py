def main():
    n = int(input())
    x5 = 1
    x8 = 1
    x55 = 0
    x88 = 0
    for i in range(2, n + 1):
        f5 = x8 + x88
        f8 = x5 + x55
        f55 = x5
        f88 = x8
        x5 = f5
        x8 = f8
        x55 = f55
        x88 = f88

    return x5 + x8 + x55 + x88


# print(main())
