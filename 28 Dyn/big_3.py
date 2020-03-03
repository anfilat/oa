def main():
    count = int(input())
    line = [0 for _ in range(count)]
    line_l = [0 for _ in range(count)]
    line_r = [0 for _ in range(count)]

    for i in range(count):
        line[i] = int(input())

    for i in range(count - 1, -1, -1):
        for j in range(i, -1, -1):
            if line[j] >= line[i]:
                line_l[i] = j
            else:
                break

    for i in range(0, count):
        for j in range(i, count):
            if line[j] >= line[i]:
                line_r[i] = j
            else:
                break

    s_l = ''
    s_r = ''
    for i in range(count):
        if i != 0:
            s_l += ' '
            s_r += ' '
        s_l += str(line_l[i])
        s_r += str(line_r[i])

    print(s_l)
    print(s_r)


# main()
