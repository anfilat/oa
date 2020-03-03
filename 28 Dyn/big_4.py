def calc_row(trees, row, y, max_x):
    for x in range(max_x):
        if (x, y) in trees:
            row[x] = 0
        else:
            row[x] += 1


def calc_right(row, row_r, max_x):
    for i in range(0, max_x):
        for j in range(i, max_x):
            if row[j] >= row[i]:
                row_r[i] = j
            else:
                break


def calc_left(row, row_l, max_x):
    for i in range(max_x - 1, -1, -1):
        for j in range(i, -1, -1):
            if row[j] >= row[i]:
                row_l[i] = j
            else:
                break


def find_max_row_square(row, row_l, row_r, max_x):
    result = 0
    for x in range(max_x):
        result = max(result, row[x] * (row_r[x] - row_l[x] + 1))

    return result


def main():
    line = input().split()
    max_x = int(line[0])
    max_y = int(line[1])
    count_t = int(input())

    trees = set()
    for _ in range(count_t):
        xy = input().split()
        trees.add((int(xy[0]), int(xy[1])))

    row = [0 for _ in range(max_x)]
    row_l = [0 for _ in range(max_x)]
    row_r = [0 for _ in range(max_x)]

    result = 0
    for y in range(max_y):
        calc_row(trees, row, y, max_x)
        calc_right(row, row_r, max_x)
        calc_left(row, row_l, max_x)
        result = max(result, find_max_row_square(row, row_l, row_r, max_x))

    print(result)


# main()
