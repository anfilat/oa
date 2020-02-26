import unittest
from unittest.mock import patch
import task_3


class Test58(unittest.TestCase):
    def test_0(self):
        user_input = ['3']
        with patch('builtins.input', side_effect=user_input):
            self.assertEqual(task_3.main(), 6)

    def test_1(self):
        user_input = ['1']
        with patch('builtins.input', side_effect=user_input):
            self.assertEqual(task_3.main(), 2)

    def test_2(self):
        user_input = ['2']
        with patch('builtins.input', side_effect=user_input):
            self.assertEqual(task_3.main(), 4)

    def test_3(self):
        user_input = ['5']
        with patch('builtins.input', side_effect=user_input):
            self.assertEqual(task_3.main(), 16)

    def test_4(self):
        user_input = ['10']
        with patch('builtins.input', side_effect=user_input):
            self.assertEqual(task_3.main(), 178)

    def test_5(self):
        user_input = ['20']
        with patch('builtins.input', side_effect=user_input):
            self.assertEqual(task_3.main(), 21892)

    def test_6(self):
        user_input = ['40']
        with patch('builtins.input', side_effect=user_input):
            self.assertEqual(task_3.main(), 331160282
                             )
    def test_7(self):
        user_input = ['60']
        with patch('builtins.input', side_effect=user_input):
            self.assertEqual(task_3.main(), 5009461563922)

    def test_8(self):
        user_input = ['75']
        with patch('builtins.input', side_effect=user_input):
            self.assertEqual(task_3.main(), 6832909245813414)

    def test_9(self):
        user_input = ['88']
        with patch('builtins.input', side_effect=user_input):
            self.assertEqual(task_3.main(), 3559958832009428378)
