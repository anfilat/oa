def main():
    n = int(input())
    tree = [[0 for j in range(n)] for i in range(n)]

    for i in range(n):
        line = input().split()
        for j in range(i + 1):
            tree[i][j] = int(line[j])

    for i in range(n - 2, -1, -1):
        for j in range(i + 1):
            tree[i][j] += max(tree[i + 1][j], tree[i + 1][j + 1])

    return tree[0][0]


# print(main())
