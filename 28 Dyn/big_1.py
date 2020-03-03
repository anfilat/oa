def find_way_length(map, x, y, max_x):
    length = 0
    while x < max_x:
        if map[x][y] == 1:
            break
        length += 1
        x += 1

    return length


def find_max_barn(map, x0, y0, max_x, max_y):
    limit_length = find_way_length(map, x0, y0, max_x)
    length_y = 1
    max_square = limit_length * length_y
    for y in range(y0 + 1, max_y):
        length_y += 1
        length_x = find_way_length(map, x0, y, max_x)
        if limit_length > length_x:
            limit_length = length_x
        if length_x > limit_length:
            length_x = limit_length
        if max_square < length_x * length_y:
            max_square = length_x * length_y

    return max_square


def main():
    line = input().split()
    max_x = int(line[0])
    max_y = int(line[1])
    map = [[0 for y in range(max_y)] for x in range(max_x)]

    for y in range(max_y):
        line = input().split()
        for x in range(max_x):
            map[x][y] = int(line[x])

    result = 0
    for y in range(max_y):
        for x in range(max_x):
            result = max(result, find_max_barn(map, x, y, max_x, max_y))

    return result


# print(main())
