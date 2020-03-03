def main():
    line = input().split()
    max_x = int(line[0])
    max_y = int(line[1])
    count_t = int(input())

    map = set()
    for _ in range(count_t):
        xy = input().split()
        map.add((int(xy[0]), int(xy[1])))

    line = [0 for _ in range(max_x)]
    for y in range(max_y):
        s = ''
        for x in range(max_x):
            if (x, y) in map:
                line[x] = 0
            else:
                line[x] += 1

            if x != 0:
                s += ' '
            s += str(line[x])
        print(s)


# main()
