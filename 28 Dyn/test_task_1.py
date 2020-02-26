import unittest
import task_1


class TestPeas(unittest.TestCase):
    def test_0(self):
        self.assertEqual(task_1.main('2/100+3/100'), '1/20')

    def test_1(self):
        self.assertEqual(task_1.main('1/2+1/5'), '7/10')

    def test_2(self):
        self.assertEqual(task_1.main('1/10000+9999/10000'), '1/1')

    def test_3(self):
        self.assertEqual(task_1.main('1/2+5/15'), '5/6')

    def test_4(self):
        self.assertEqual(task_1.main('2/15+4/18'), '16/45')

    def test_5(self):
        self.assertEqual(task_1.main('4/24+2/16'), '7/24')

    def test_6(self):
        self.assertEqual(task_1.main('60/100+3/25'), '18/25')

    def test_7(self):
        self.assertEqual(task_1.main('1/10000+1/10000'), '1/5000')

    def test_8(self):
        self.assertEqual(task_1.main('123/456+789/1112'), '10345/10564')

    def test_9(self):
        self.assertEqual(task_1.main('1/9973+1/9999'), '19972/99720027')
