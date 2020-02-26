def walk(x, y, n, map):
    if x < 0 or x >= n:
        return
    if y < 0 or y >= n:
        return
    if map[x][y] == 0:
        return
    map[x][y] = 0
    walk(x - 1, y, n, map)
    walk(x + 1, y, n, map)
    walk(x, y - 1, n, map)
    walk(x, y + 1, n, map)


def main():
    n = int(input())
    map = [[0 for j in range(n)] for i in range(n)]

    for y in range(n):
        line = input().split()
        for x in range(n):
            map[x][y] = int(line[x])

    islands = 0

    for y in range(n):
        for x in range(n):
            if map[x][y] == 1:
                islands += 1
                walk(x, y, n, map)

    return islands


#print(main())
