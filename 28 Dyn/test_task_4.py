import unittest
from unittest.mock import patch
import task_4


class TestTree(unittest.TestCase):
    def test_0(self):
        user_input = [
            '4',
            '1 1 1 1',
            '0 1 0 1',
            '0 0 0 0',
            '1 0 1 1',
        ]
        with patch('builtins.input', side_effect=user_input):
            self.assertEqual(task_4.main(), 3)

    def test_1(self):
        user_input = [
            '1',
            '0',
        ]
        with patch('builtins.input', side_effect=user_input):
            self.assertEqual(task_4.main(), 0)

    def test_2(self):
        user_input = [
            '1',
            '1',
        ]
        with patch('builtins.input', side_effect=user_input):
            self.assertEqual(task_4.main(), 1)

    def test_3(self):
        user_input = [
            '2',
            '1 1',
            '1 1',
        ]
        with patch('builtins.input', side_effect=user_input):
            self.assertEqual(task_4.main(), 1)

    def test_4(self):
        user_input = [
            '3',
            '1 1 1',
            '1 0 1',
            '1 1 1',
        ]
        with patch('builtins.input', side_effect=user_input):
            self.assertEqual(task_4.main(), 1)

    def test_5(self):
        user_input = [
            '3',
            '1 0 1',
            '0 1 0',
            '1 0 1',
        ]
        with patch('builtins.input', side_effect=user_input):
            self.assertEqual(task_4.main(), 5)

    def test_6(self):
        user_input = [
            '3',
            '1 1 1',
            '0 1 0',
            '1 1 1',
        ]
        with patch('builtins.input', side_effect=user_input):
            self.assertEqual(task_4.main(), 1)

    def test_7(self):
        user_input = [
            '10',
            '0 1 0 0 0 0 1 0 0 0',
            '0 0 0 0 1 0 0 0 1 0',
            '0 0 0 0 0 0 0 0 0 0',
            '0 0 1 0 0 0 1 0 0 0',
            '0 0 0 0 0 0 0 0 0 0',
            '0 0 0 0 0 0 0 1 0 0',
            '0 0 0 1 0 0 0 0 0 0',
            '1 0 0 0 0 0 0 0 0 0',
            '0 0 0 0 0 0 0 0 1 0',
            '0 0 0 0 0 1 0 0 0 0',
        ]
        with patch('builtins.input', side_effect=user_input):
            self.assertEqual(task_4.main(), 11)

    def test_8(self):
        user_input = [
            '50',
            '1 1 1 1 1 1 1 0 1 1 1 0 1 0 1 0 1 1 0 1 1 1 0 1 1 0 1 1 1 1 1 1 1 1 1 1 1 0 1 1 1 0 1 1 0 1 1 1 1 1',
            '1 0 0 1 1 1 1 1 0 1 1 1 1 0 0 1 1 1 1 1 0 1 1 1 1 1 1 1 1 0 1 0 1 1 0 1 0 1 1 1 0 0 1 1 0 1 1 1 1 0',
            '1 1 1 0 0 1 1 1 1 0 0 0 1 0 0 1 1 1 0 1 1 0 1 1 1 0 1 0 0 1 0 0 1 1 1 0 0 1 1 0 1 1 0 1 0 1 0 1 1 1',
            '1 1 1 1 1 1 1 1 0 0 0 0 1 0 0 0 1 0 1 0 1 1 0 1 1 0 0 1 0 1 0 1 1 1 0 1 1 1 1 0 1 1 0 1 1 1 1 1 1 0',
            '1 0 1 1 0 1 1 1 0 0 1 0 1 0 1 1 0 1 0 1 1 0 1 1 1 1 1 1 1 1 1 1 0 1 0 0 1 1 1 0 0 1 1 0 1 1 0 1 1 1',
            '1 0 1 1 1 1 1 1 1 1 1 1 1 0 1 0 1 1 0 1 1 1 1 0 0 0 1 1 1 0 1 1 1 1 0 1 1 0 1 1 1 1 1 0 1 0 1 1 1 1',
            '1 1 1 1 1 1 1 1 1 0 0 1 1 1 1 0 0 1 0 0 1 1 0 1 0 0 1 1 1 1 1 0 1 1 1 1 1 0 0 0 0 1 1 0 0 1 1 1 1 1',
            '0 0 0 1 0 1 1 1 1 0 1 1 1 1 1 0 1 0 1 1 0 1 1 1 0 1 0 0 1 1 1 1 1 1 1 1 1 1 1 0 1 0 1 1 0 1 1 1 1 0',
            '1 1 1 1 1 1 1 1 1 0 1 1 1 0 1 1 1 1 1 0 0 0 1 1 0 1 1 1 1 1 1 0 1 1 1 1 1 0 1 1 1 1 0 1 1 0 0 1 0 1',
            '1 1 0 1 1 1 1 0 0 1 1 1 1 0 1 0 1 0 1 1 1 1 1 1 1 1 0 1 1 0 1 1 1 1 1 1 0 1 1 1 1 1 1 0 1 0 1 0 1 1',
            '1 1 1 0 1 0 0 1 0 1 1 1 0 0 1 0 1 1 1 1 0 1 1 1 0 1 0 1 0 0 1 1 1 1 1 1 0 0 0 1 1 1 1 1 0 1 1 1 1 1',
            '0 0 1 1 0 1 1 0 0 1 0 1 0 0 1 1 1 1 1 1 1 1 1 0 1 1 0 0 1 1 0 1 1 1 1 1 1 1 0 0 1 1 0 1 1 0 1 1 1 1',
            '1 1 0 1 1 1 1 1 0 1 0 0 1 1 1 1 1 0 1 1 0 1 1 0 0 0 1 1 1 1 1 1 1 1 1 1 0 0 1 0 0 0 1 1 0 0 1 1 1 1',
            '1 1 0 1 1 0 0 1 1 0 0 1 1 1 0 1 1 0 1 1 1 1 1 0 0 0 1 0 0 1 0 1 1 1 0 1 1 1 0 1 0 0 1 0 0 0 1 1 0 1',
            '1 1 1 1 0 1 1 1 1 1 1 1 1 1 0 0 0 1 1 1 1 1 1 1 1 0 1 1 0 0 1 1 1 1 0 1 0 1 1 0 1 1 0 1 1 0 1 0 0 1',
            '0 1 0 1 0 0 0 1 1 0 1 0 1 1 1 0 0 0 1 1 0 0 0 1 0 1 0 1 1 0 1 1 1 0 1 0 1 1 1 1 1 1 0 1 0 1 1 1 1 1',
            '0 1 1 1 1 0 1 1 1 0 0 0 1 1 1 0 1 1 1 1 1 1 1 1 1 0 1 1 0 1 0 1 1 1 1 0 0 1 1 1 1 1 1 1 1 0 0 1 0 0',
            '1 0 0 1 1 1 1 1 1 1 0 1 1 1 1 1 1 0 1 0 0 1 0 1 1 0 1 1 1 0 0 0 1 0 0 0 1 1 1 1 1 0 0 1 1 1 0 1 1 0',
            '1 1 0 0 0 1 1 0 0 1 1 1 1 1 1 0 1 0 1 1 1 1 0 0 1 1 1 0 1 1 1 0 1 1 1 0 1 1 0 1 0 1 1 0 1 0 1 1 1 1',
            '1 1 1 1 0 1 1 0 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 1 1 1 0 1 1 1 1 1 1 0 1 0 0 0 1 1 1 1 1 1 1 1 1 0 1 1',
            '1 0 1 1 0 1 1 1 0 1 1 1 1 0 1 0 0 1 0 1 0 1 1 1 1 0 0 0 1 1 1 0 1 1 1 0 0 1 1 1 0 1 1 1 1 1 0 1 1 1',
            '1 1 0 1 0 0 1 1 1 1 1 1 1 0 0 1 0 1 1 1 1 1 1 0 1 1 1 0 1 1 0 0 1 1 1 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1',
            '1 1 1 0 0 1 1 1 1 1 1 0 0 0 1 0 0 1 1 1 1 1 0 1 1 1 0 1 1 1 1 1 1 0 1 1 1 0 1 1 1 0 0 0 1 1 0 1 1 1',
            '1 1 1 1 0 1 1 1 1 1 1 1 0 1 0 1 1 0 0 1 1 0 1 1 1 0 1 1 0 1 1 1 1 0 1 1 0 1 0 1 0 0 1 0 1 1 1 1 1 0',
            '0 1 0 1 0 1 1 1 0 1 0 1 1 1 0 1 0 0 0 1 1 1 0 0 0 0 1 1 1 1 0 1 1 0 1 1 1 0 0 0 1 1 1 0 1 1 1 1 1 1',
            '1 1 0 0 1 0 1 1 1 1 1 1 1 1 1 1 1 0 1 1 1 1 0 0 1 1 0 1 1 1 1 1 1 1 0 1 0 1 1 1 1 1 1 0 1 0 0 0 1 1',
            '0 1 0 0 1 1 1 0 1 0 0 0 1 1 1 1 1 0 1 0 1 1 1 0 0 1 1 0 1 1 1 0 0 1 1 1 1 1 0 1 1 1 1 1 1 1 0 0 1 1',
            '1 1 1 1 0 1 1 1 0 1 1 1 1 1 1 1 0 1 1 1 0 1 0 1 1 1 1 0 1 1 1 1 1 1 0 1 1 1 1 1 0 1 1 0 1 1 1 1 1 1',
            '0 0 1 1 0 1 1 1 1 0 1 1 0 0 0 1 0 1 1 1 1 1 1 1 1 1 0 1 1 1 0 1 0 0 1 1 1 1 1 1 1 1 1 0 1 0 1 1 0 1',
            '1 1 1 1 1 1 1 0 0 1 1 1 1 0 0 0 1 1 1 1 1 1 1 1 0 1 1 0 1 1 1 1 1 1 1 1 1 0 1 0 1 0 1 1 1 0 0 1 0 1',
            '1 1 1 0 1 1 0 1 1 1 1 1 1 1 1 0 1 1 0 1 0 1 1 1 1 0 1 0 1 1 1 1 0 1 1 1 1 1 0 1 0 1 0 1 0 1 1 1 0 1',
            '0 0 1 1 1 1 1 1 1 0 1 0 1 0 0 0 1 1 1 1 1 1 1 1 1 1 0 0 0 1 1 1 1 0 1 1 0 1 1 0 0 1 1 1 1 1 1 0 0 0',
            '1 1 0 1 0 1 1 1 1 0 0 0 1 0 1 1 1 1 1 1 0 0 0 0 1 1 1 1 0 1 0 1 1 1 1 0 0 1 0 0 1 0 1 1 0 0 1 1 1 1',
            '1 0 1 1 0 1 1 0 1 1 1 1 1 0 0 0 0 1 0 1 0 0 1 1 1 1 0 0 1 1 0 0 0 1 0 1 0 1 1 0 1 1 1 1 0 1 0 1 1 1',
            '1 1 1 0 0 1 1 1 1 0 1 0 0 1 0 1 1 0 0 0 0 1 1 0 1 1 1 1 0 1 1 1 1 0 1 1 1 0 1 1 0 1 1 1 1 0 1 0 1 1',
            '1 1 1 1 1 1 1 1 0 1 1 0 0 1 1 0 1 0 1 1 1 0 1 1 1 1 1 0 1 1 1 1 1 1 1 1 1 1 0 1 1 1 0 1 1 0 1 1 0 1',
            '1 1 1 0 1 1 0 1 0 1 1 1 1 1 1 1 0 1 0 1 0 1 0 1 1 0 0 0 0 1 1 1 1 0 1 1 0 1 1 1 1 0 1 1 1 1 1 1 1 0',
            '1 1 1 1 0 0 1 1 1 1 1 0 1 1 1 1 1 1 0 1 1 1 0 1 1 0 1 0 0 0 1 0 1 0 1 0 1 0 0 1 0 0 1 1 1 1 1 1 1 1',
            '1 0 1 0 1 1 1 1 1 0 0 0 1 1 0 1 1 1 1 1 1 1 1 1 0 0 1 0 1 1 1 1 1 1 0 0 1 0 1 0 0 1 1 1 0 0 1 0 1 1',
            '0 1 0 1 1 1 1 0 1 1 1 1 0 1 1 1 1 1 1 1 0 1 0 1 1 1 1 1 1 0 1 1 0 1 1 1 1 0 0 1 1 1 0 0 1 1 1 0 1 1',
            '1 0 1 0 1 1 1 0 1 1 1 1 1 1 1 1 1 0 0 1 1 0 1 1 1 1 0 1 0 0 1 1 0 1 1 1 1 0 1 1 1 1 1 0 1 1 1 1 1 0',
            '1 1 0 1 1 1 1 1 1 1 1 0 0 1 0 0 1 1 0 1 1 1 1 0 1 1 1 0 0 1 1 1 0 0 1 1 1 1 1 0 1 1 1 1 1 1 1 1 0 1',
            '1 0 0 1 1 1 1 1 1 1 1 1 1 1 0 1 1 1 1 1 1 1 0 0 0 1 0 1 1 0 1 0 0 0 0 1 1 1 1 1 1 1 1 0 0 0 0 1 1 0',
            '0 1 1 1 0 1 1 1 1 1 1 1 0 1 0 1 1 1 1 1 1 1 0 1 1 0 1 0 1 1 1 1 1 1 0 1 1 1 0 1 1 1 1 0 1 0 0 1 1 1',
            '1 1 1 1 1 1 1 0 1 1 1 1 1 1 1 0 1 1 1 1 1 1 0 1 1 1 1 1 1 1 1 1 1 0 0 0 1 1 1 1 0 1 1 1 0 0 1 1 1 1',
            '1 1 1 1 1 0 1 1 0 1 0 1 1 1 1 1 0 1 1 1 1 1 1 0 1 0 0 1 1 1 0 0 0 1 1 0 1 1 1 1 1 1 1 1 0 0 1 1 1 1',
            '1 0 1 1 1 1 1 1 0 1 0 1 1 0 1 0 1 1 0 1 1 1 1 1 0 1 1 0 1 0 1 1 0 0 0 0 0 1 1 1 0 1 1 1 1 1 1 1 1 0',
            '1 1 0 1 1 1 1 1 0 1 0 0 1 1 1 1 1 0 1 1 0 1 1 0 0 0 1 1 1 1 1 1 1 1 1 1 0 0 1 0 0 0 1 1 0 0 1 1 1 1',
            '1 1 1 0 1 1 0 1 0 1 1 1 1 1 1 1 0 1 0 1 0 1 0 1 1 0 0 0 0 1 1 1 1 0 1 1 0 1 1 1 1 0 1 1 1 1 1 1 1 0',
            '1 1 0 1 1 1 1 1 1 1 1 0 0 1 0 0 1 1 0 1 1 1 1 0 1 1 1 0 0 1 1 1 0 0 1 1 1 1 1 0 1 1 1 1 1 1 1 1 0 1',
        ]
        with patch('builtins.input', side_effect=user_input):
            self.assertEqual(task_4.main(), 26)

    def test_9(self):
        user_input = [
            '100',
            '0 1 1 0 0 1 1 0 1 0 0 0 0 0 0 1 1 0 0 1 1 0 0 0 0 0 1 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 1 0 1 0 0 0 0 1 0 0 1 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 1 0 1 0 0 0 0 1 0 1 0',
            '0 0 0 0 0 1 1 0 1 0 1 0 1 0 0 0 1 0 0 1 0 0 0 0 1 0 0 1 0 1 0 0 1 1 1 1 0 1 1 0 0 0 1 0 0 0 0 1 1 1 1 0 1 1 1 1 1 0 1 0 0 0 1 1 1 0 1 1 0 0 0 1 0 0 0 0 1 0 0 0 0 0 1 0 1 0 0 1 1 1 1 0 0 0 1 0 0 1 0 0',
            '0 0 0 0 0 0 1 1 0 1 0 0 1 0 0 0 0 0 0 1 1 1 0 0 0 1 0 1 0 0 0 1 1 0 1 0 0 0 0 1 0 1 0 0 1 0 0 1 0 1 0 1 1 0 0 0 0 1 1 0 0 1 0 0 0 0 1 0 0 0 1 0 0 0 0 0 0 1 0 0 0 1 1 0 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0',
            '0 0 0 0 1 0 1 0 0 0 0 0 0 0 1 0 1 0 0 0 0 0 0 0 0 0 0 1 0 1 1 0 0 0 1 0 0 0 0 0 0 0 0 0 1 1 1 0 0 1 1 1 0 1 0 1 0 1 0 0 0 1 0 0 0 0 1 0 0 0 1 0 1 0 1 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 1 0 0',
            '1 1 0 0 0 0 0 0 0 1 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 1 1 0 0 0 0 1 0 1 0 1 0 1 0 0 1 0 0 1 0 0 0 1 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 1 0 0 1 0 0',
            '0 0 0 0 1 1 1 0 0 1 1 1 0 1 1 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 1 0 1 0 0 1 0 0 1 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 1 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 1 1 0 0 0 1 0 1 0 0 1 1 1 0 0 0',
            '0 0 1 0 1 1 0 0 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0 0 1 0 0 0 0 1 0 1 0 0 1 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 1 0 1 0 0 1 1 0 0 0 0 1 0 1 1',
            '0 0 0 0 1 0 0 0 0 1 1 0 0 1 1 0 0 1 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 1 0 1 1 0 0 0 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0 0 1 0 0 0 0 0 0 1 1 1 0 1 1 0 1 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0 1 1 1 1',
            '1 0 1 0 0 0 1 1 0 1 0 1 0 1 0 0 1 1 0 0 0 1 0 0 0 1 0 0 0 1 1 0 1 1 0 0 1 0 0 0 0 0 0 1 1 0 0 0 1 0 0 0 0 0 0 1 0 0 1 0 0 0 1 0 1 1 0 0 0 0 1 1 0 1 0 0 0 0 0 0 0 0 1 1 0 1 0 0 0 0 0 0 0 1 0 1 1 1 0 0',
            '0 0 1 0 0 0 0 0 0 1 0 0 0 1 0 1 0 1 0 0 0 0 0 0 1 0 1 1 0 0 1 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 1 0 0 0 1 1 0 1 1 1 1 0 0 0 0 1 0 1 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 1 1 0 0 0 0 1 0 0 0 0 0 0 0 0',
            '0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 1 0 1 0 0 0 0 0 0 0 0 1 0 0 1 0 0 0 0 0 1 1 0 0 1 1 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 1 1 1 0 0 0 1 0 1 0 0 0 1 1 0 0 0 1 0 1',
            '0 1 0 1 1 0 0 0 0 0 0 0 0 0 1 1 0 1 1 0 0 0 0 0 0 1 1 1 0 0 0 0 1 0 1 1 1 1 1 1 0 0 0 0 0 0 1 1 0 1 0 0 1 0 0 1 1 0 1 0 0 0 0 1 0 0 0 0 0 1 1 1 0 0 1 0 0 1 0 0 1 0 1 0 1 0 0 1 0 1 0 0 1 1 0 0 0 0 1 0',
            '0 1 0 0 1 1 0 1 0 0 0 1 1 0 0 0 0 0 1 1 0 0 1 1 0 0 1 0 0 0 0 0 1 0 0 0 1 1 1 0 0 1 0 0 0 0 0 0 0 0 1 0 0 1 0 0 1 0 0 0 0 0 0 0 0 1 0 0 1 1 0 0 0 1 0 0 0 1 0 0 1 0 0 0 1 0 0 0 1 0 0 0 0 0 0 0 1 1 1 0',
            '0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 1 1 0 0 0 0 0 0 1 0 1 0 1 1 0 1 0 1 0 1 0 1 1 1 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0 0 0 1 0 0 1 1 0 1 0 1 0 1 1 1 1 1 0 0 0 0',
            '1 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 1 0 0 0 1 1 0 1 1 0 0 0 0 1 0 0 0 0 0 1 0 0 0 1 0 1 0 1 1 0 1 0 0 1 0 1 0 1 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 1 0 0 0 1 0 0 1 0 0 1 0',
            '0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 1 0 0 1 1 0 0 0 1 0 0 0 1 1 1 0 0 1 1 0 0 1 0 1 1 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 1 0 1 0 1 0 0 1 0 0 1 0 1 1 0 0 0 0 1 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 1 0 0 0 0',
            '0 0 1 0 0 1 0 0 1 0 0 0 1 0 0 0 1 1 1 0 0 0 1 0 0 1 0 1 0 1 0 0 0 0 0 0 0 0 1 0 0 0 1 0 0 0 0 0 1 0 0 1 0 0 0 0 0 1 0 0 0 1 0 1 1 1 0 1 1 0 1 0 0 0 1 0 0 1 1 0 0 1 0 1 1 1 0 0 0 1 0 0 0 0 1 1 1 1 0 0',
            '1 0 0 1 0 1 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 1 0 0 1 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0 1 0 0 1 1 1 1 1 0 0 0 1 1 0 1 0 0 1 1 1 0 0 0 0 0 1 0 0 0 0 1 1 1 0 1 0 0 0 0 0 0 1 1 0 0 0 0 0 0 1 0 0 0',
            '1 1 0 1 0 0 0 0 1 1 0 0 1 1 0 0 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 1 1 1 1 1 0 1 1 1 1 1 0 0 1 0 0 0 0 0 1 1 1 0 0 1 0 1 0 0 1 0 0 1 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0 0',
            '0 0 0 0 0 1 0 0 0 0 0 0 1 0 0 1 0 0 1 0 0 0 1 1 0 0 1 1 0 0 1 0 0 0 0 0 1 0 1 0 1 0 1 0 1 0 0 0 1 0 1 0 0 1 0 0 0 1 0 0 0 0 1 1 0 0 0 0 0 0 1 1 0 0 0 1 0 0 0 1 0 0 1 1 0 1 0 0 0 1 1 0 0 1 0 0 0 1 0 0',
            '0 0 0 1 0 0 1 0 0 0 0 1 1 0 1 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 1 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 1 1 1 0 1 1 1 0 1 0 0 0 0',
            '0 1 1 0 1 0 0 1 1 0 0 0 1 1 0 1 0 0 0 1 0 0 0 1 0 1 0 1 1 1 1 1 0 0 0 1 1 0 1 1 1 0 0 0 1 0 0 0 1 1 0 0 0 0 0 1 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 1 0 0 0 1 1 0 1 0 0 1 0 0 1 0 1 0 0 0 0 1 1',
            '0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 1 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0 0 1 1 0 0 1 0 0 0 0 0 1 0 0 1 0 1 0 0 0 1 1 0 0 0 1 1 0 1 0 0 0 0 1 0 1 0 0 0 0 0 0 0 0 1 1 1 0 0 0 1 0 0 0 0 0 0 0',
            '0 1 0 1 0 1 1 0 0 0 0 1 1 0 1 1 1 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 1 0 1 1 0 0 1 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 1 1 0 1 0 1 1 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 1 0 0 1 0 1 0 1 1 1 0 1 1 0 0 0',
            '0 0 0 0 1 1 1 1 1 0 1 0 0 0 1 1 1 0 0 1 1 0 0 0 1 0 0 0 0 0 1 0 0 0 0 1 0 0 1 1 0 0 0 1 0 1 1 1 0 0 1 1 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 1 0 0 1 1 1 1 0 0 1 0 0 0 0 1 0 1 1 0 0 0 0 1 1 0 0',
            '1 0 0 0 0 1 0 0 1 0 1 0 0 0 0 1 0 0 1 0 1 1 0 0 0 1 0 1 0 0 0 0 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 1 1 1 0 1 1 1 0 1 1 1 1 0 0 1 0 0 0 0 1 0 0 0 1 0 0 1 1 0 1 1 1 0 0 0 1 0 1 0 1 1 0 1 1 1',
            '0 0 1 0 1 1 0 0 0 1 1 0 1 0 0 0 1 0 1 1 1 1 1 0 1 1 0 0 0 0 0 0 1 0 1 0 1 0 0 1 1 1 1 1 0 0 1 0 1 0 1 1 1 1 0 1 0 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 1 0 0 0 1 0 0 1 0 0 1 1 0 0 1 0 1',
            '0 0 1 1 0 0 0 1 0 0 1 0 1 0 0 1 1 1 1 0 0 1 0 0 0 0 1 0 0 1 0 0 1 0 0 1 0 0 0 0 1 0 0 1 0 0 0 1 1 1 0 0 1 0 0 1 0 0 0 0 1 1 0 0 1 1 0 1 0 0 0 0 0 0 1 1 0 1 0 0 0 1 1 0 0 1 0 0 0 0 0 1 1 0 1 1 1 0 1 0',
            '0 0 0 0 0 0 0 0 1 0 0 0 0 1 1 1 0 1 1 1 0 0 0 0 0 1 0 1 0 1 1 0 1 0 0 1 0 0 0 1 1 1 0 0 1 0 0 0 0 1 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 1 0 1 0 0 0 1 0 0 0 0 0 0 1 1 0 1 0 1 0 0 0 0 1 0 0 0 0 0',
            '1 0 1 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 1 1 1 0 0 0 0 0 1 1 0 0 0 0 1 1 0 0 1 0 1 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 1 0 1 0 0 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1',
            '0 0 1 1 1 1 1 1 0 1 0 0 0 0 1 1 0 0 0 1 0 0 0 0 1 0 1 0 0 1 0 0 0 0 1 0 1 0 0 1 1 0 1 1 0 0 0 0 0 0 0 0 1 0 0 1 0 0 1 0 0 1 0 1 0 1 0 0 0 0 1 1 0 1 1 0 1 0 0 0 0 0 1 0 0 1 1 1 0 1 0 0 0 0 1 0 0 1 0 0',
            '0 0 1 0 1 0 0 1 0 1 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0 1 0 1 0 0 1 1 1 0 0 1 0 1 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 1 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0',
            '0 0 0 1 0 1 0 0 0 0 1 1 0 1 1 0 1 1 1 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 1 0 1 0 0 0 1 1 0 0 0 0 1 0 1 0 0 0 1 1 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0',
            '0 0 0 0 1 0 1 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 1 0 1 0 0 0 1 1 0 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 1 1 0 0 0 1 0 0 1 0 0 0 0 1 1 0 0 0 0 1 1 0 1 0 0 0 1 1 0 1 1 0 0 0 0 0 0 0 0 0',
            '0 1 0 0 0 0 0 1 0 0 0 1 1 0 1 1 1 0 0 0 0 0 1 1 0 1 0 1 0 1 0 0 0 0 0 1 0 0 0 1 1 1 0 0 1 0 0 1 0 0 0 1 0 0 0 1 1 0 0 0 1 0 0 1 0 0 0 0 1 1 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 1 0 1 0 0 1 0 0 0 0 0 0 0 0',
            '1 0 1 0 0 1 0 0 1 0 0 0 0 0 1 0 1 0 0 0 0 1 0 0 1 0 0 0 0 0 0 0 0 1 0 0 1 0 1 1 0 1 0 0 1 0 0 1 0 1 0 0 0 0 0 0 1 0 0 0 1 1 0 0 1 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0 0 1 0 0',
            '0 1 0 1 0 0 1 1 0 0 0 1 0 1 0 1 1 1 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 1 0 0 0 0 1 0 0 0 0 1 1 0 0 0 1 0 1 0 1 1 0 0 0 1 0 0 1 1 0 0 0 0 0 0 1 1 0 0 0 1 0 1 1 0 0 1 0 0 0 0 1 1 1 0 0 1 1 0 1 1 0 0 1 0 0 1',
            '0 0 1 0 0 0 0 1 1 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 1 0 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0 1 0 0 1 0 0 1 1 0 1 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 1 1 0 1 0 1 0 1 0 0 1 1 0 1 1 0 0 0 0 0 1 1 0 0 0 0 0 0 1',
            '0 1 1 1 0 1 0 1 0 0 0 0 1 1 0 0 0 1 1 0 0 1 1 1 1 0 0 1 1 0 0 0 1 1 0 0 1 0 1 1 0 0 0 0 0 0 1 1 1 0 1 0 0 1 1 0 0 1 1 0 0 0 1 1 0 0 0 0 0 0 0 0 1 1 0 0 1 0 0 0 0 0 1 0 0 1 0 0 1 0 0 1 0 0 0 1 0 0 0 0',
            '1 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 1 0 1 0 1 0 1 0 0 1 1 1 0 0 0 0 0 0 0 0 0 1 0 1 1 0 1 0 0 1 0 0 1 1 0 1 0 1 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 1 0 0',
            '1 0 1 0 0 0 0 0 0 0 1 0 0 0 0 1 1 1 0 0 0 1 0 1 1 0 0 0 1 0 0 0 1 0 0 0 1 1 0 0 1 0 0 0 0 0 0 0 0 1 0 0 1 0 1 0 1 1 0 1 1 0 0 0 1 0 0 0 0 0 1 1 1 1 0 0 0 0 1 0 0 0 0 1 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0 1',
            '0 1 0 0 1 0 1 1 1 0 0 1 0 1 0 1 0 1 0 1 0 0 1 0 0 0 0 0 0 1 1 0 0 0 0 0 1 1 1 1 0 1 1 0 0 1 0 1 0 1 0 0 0 1 0 0 1 1 0 1 0 0 0 1 1 0 0 1 0 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 1 0 0 0 0 0 1 0 0',
            '0 1 0 0 1 1 1 1 0 1 0 0 0 0 0 0 1 0 0 1 0 0 0 0 0 1 0 0 1 0 0 0 0 0 0 1 0 1 0 1 0 1 0 1 0 1 0 0 1 1 0 0 0 1 1 0 0 1 0 0 0 0 1 1 1 0 0 0 0 0 0 1 1 0 0 0 1 0 0 1 0 1 1 0 0 1 0 1 0 0 0 0 0 0 0 0 1 1 0 1',
            '1 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0 0 1 1 0 0 1 0 0 0 1 0 0 0 1 0 0 0 1 0 1 0 1 0 0 0 0 1 0 0 1 0 1 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1',
            '0 1 0 0 0 0 1 1 1 0 1 0 0 1 1 0 0 1 0 0 0 1 0 0 1 1 1 0 1 1 0 1 1 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0 1 0 1 1 0 0 0 1 0 0 1 0 0 1 0 0 1 0 0 0 1 0 0 0 0 0 1 0 0 0 1 0 1 0 1 0 1 1 0 0 0 0',
            '1 0 0 0 0 0 1 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 1 1 0 0 0 0 0 1 0 1 0 0 1 1 0 0 1 0 1 0 1 0 0 0 0 0 0 1 1 0 0 1 1 0 0 0 0 0 0 0 1 0 1 0 1 1 0 1 0 0 0 0 0 0 0 0 0',
            '0 0 0 0 1 1 1 0 0 0 0 0 0 1 0 1 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 1 0 0 1 0 0 0 1 0 1 0 1 0 0 0 1 0 0 0 1 0 1 1 0 0 1 1 0 0 0 0 1 1 1 0 0 0 1 1 1 0 1 0 1 1 0 0 0 1 0 0 1 1 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0',
            '0 0 0 0 1 0 1 0 0 0 0 0 0 0 1 0 1 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 1 0 1 1 0 0 1 0 0 1 0 1 0 1 1 0 0 0 1 1 1 0 1 1 0 0 0 0 0 1 1 0 0 1 0 1 0 0 1 0 0 0 0 0 0 0',
            '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 1 0 0 1 0 0 1 1 0 0 1 1 1 1 0 0 0 0 0 0 1 1 0 0 1 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 1 0 1 1 0 0 1 0 0 0 0 1 0 0 1 0 0 0 1 1 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0',
            '0 1 0 1 0 0 0 0 0 1 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 1 0 1 0 1 0 0 0 0 1 0 1 0 0 1 0 0 0 0 0 0 0 1 0 0 0 1 1 1 0 0 1 1 0 0 0 0 1 1 0 0 0 0 0 1 0 0 1 0 0 0 0 0 0 1 0 0 1 1 1 0 0 0 1 0 1',
            '0 0 0 0 1 0 0 0 0 0 1 0 0 0 1 0 0 1 0 0 1 0 0 0 0 0 1 1 0 0 0 1 0 1 0 0 0 1 0 0 1 0 1 0 0 0 0 0 1 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 1 0 0 0 0 0 0 1 0 1 1 0 0 1 0 1 0 0 1 0 1 0',
            '0 1 0 0 1 1 0 0 0 1 0 0 1 1 0 0 0 0 1 0 1 0 0 1 0 1 0 0 0 0 0 1 1 0 1 0 0 0 0 0 0 0 1 0 0 0 0 1 0 1 1 1 1 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 1 0 0 1 0 0 0 0 0 0 1 0 1 0 0 0 0 1 1 0 1 0 0 0 1 0 1 0 1 0 1 0',
            '0 1 0 0 1 0 0 1 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 1 0 0 1 1 1 0 0 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 1 0 0 1 1 0 1 0 1 0 0 0 1 0 0 0 0 0 0 1 1 0 1 0 1 0 1 0 1 0',
            '0 0 0 1 1 0 1 1 0 1 0 0 0 0 0 1 0 0 1 0 1 0 0 0 0 0 0 1 1 0 0 1 1 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 1 0 0 0 1 0 0 1 1 0 0 1 1 1 1 0 0 1 0 0 1 1 0 0 1 1 0 0 0 0 0 0 1 1 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0 1',
            '0 0 0 0 0 1 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0 0 1 1 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 1 0 1 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 1 0 0 1 1 0 1 0 0 0 1 0 0 0 0 1 0 1 0 0 0 0 0 0 1 0 1 0 1 0',
            '0 0 0 1 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0 1 0 1 0 0 0 1 0 0 1 1 0 0 1 0 0 1 0 0 0 0 0 1 0 0 0 0 1 0 1 0 1 0 1 1 0 1 1 0 0 0 0 0 0 1 0 1 1 0 1 1 1 1 0 0 0 0 0 1 1 0 1 1 0 0 1 0 1 1 0 0 1 0 1 0 1 0 1 0 0 1',
            '0 0 0 1 0 0 0 1 0 0 0 0 0 0 0 0 1 0 1 1 1 1 0 0 1 0 1 0 0 1 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 1 0 0 0 1 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 1 1 0 1 0 0 0 1 1 0 0 0 1 0 0 1 0 0 0 0 0 1 0 1 1 0',
            '1 0 0 0 1 0 1 1 1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 1 0 1 1 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 1 0 0 1 1 1 0 0 0 0 0 1 0 0 0 1 0 1 1 0 0 0 0 0 1 1 0 0 1 0',
            '0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 1 0 1 0 0 0 0 0 1 1 0 0 1 1 0 1 0 0 1 0 0 0 1 1 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 1 0 0 0 0 0 0',
            '0 0 0 0 0 0 1 0 1 1 0 1 1 0 0 0 1 1 0 1 0 1 0 0 0 0 0 0 1 0 0 1 1 0 1 0 0 0 0 0 1 0 0 0 0 0 0 0 1 1 0 0 0 1 0 0 1 0 1 0 0 1 0 0 0 0 0 0 0 0 1 0 0 1 1 1 0 1 1 0 0 1 0 1 0 0 1 1 0 0 0 0 0 0 1 1 1 1 0 1',
            '0 0 0 0 0 1 0 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 1 1 1 0 0 1 1 0 1 0 0 1 0 0 0 1 0 1 0 0 0 0 0 0 0 1 0 0 0 1 0 0 0 1 0 0 0 0 1 0 1 1 1 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 1 1 0 1 0',
            '1 0 1 0 0 0 0 0 0 0 1 1 0 0 0 0 1 0 0 0 1 0 0 0 0 0 1 1 0 0 0 1 0 1 0 0 0 0 0 1 0 1 1 1 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 1 1 0 0 1 0 0 0 0 0 0 1 1 0 0 0 0 1 0 1 0 0 1 0 0 0 0 0 0 1 1 1 0 1 0 1 1 0 0',
            '0 0 0 1 1 0 0 1 1 0 0 1 0 1 0 1 0 1 1 0 0 0 1 0 1 1 0 1 1 0 0 0 0 0 0 0 1 0 0 1 0 0 0 0 0 1 0 0 1 0 0 1 0 1 1 0 0 1 0 0 1 0 1 1 1 0 0 0 1 1 0 0 1 1 0 0 1 0 0 1 0 0 0 1 1 0 0 0 0 1 0 1 0 1 0 0 0 0 0 0',
            '0 0 0 0 0 0 0 0 0 1 0 1 0 0 1 0 0 0 1 0 0 0 1 0 0 0 1 1 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 1 0 0 1 1 0 0 0 0 0 0 0 0 1 0 0 1 1 0 0 0 1 0 0 1 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 0 0 1 0 1 0 0 0 1 0',
            '0 0 1 1 0 1 1 1 0 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0 0 1 1 0 1 0 1 0 1 0 1 0 1 1 0 0 0 0 0 0 0 0 0 1 1 0 1 0 1 0 0 0 1 0 0 0 1 0 1 0 0 1 0 0 1 0 0 0 1 0 1 0 0 1 0 1 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0',
            '0 1 0 0 1 1 1 0 0 0 0 0 0 0 0 1 0 1 0 1 0 0 0 1 0 0 0 0 0 0 1 1 0 0 0 0 1 0 1 0 0 0 0 1 1 1 1 0 1 1 0 0 1 0 0 0 0 1 0 0 0 0 0 0 1 0 1 0 0 0 1 1 0 0 0 0 1 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0 0',
            '0 0 1 0 0 0 0 0 1 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0 1 1 0 0 0 1 0 0 1 0 0 0 1 0 0 0 0 0 0 1 1 0 1 0 1 0 0 0 0 0 0 0 0 1 0 1 1 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 1 0 1 0 0 0 0 1 0',
            '0 1 0 1 0 1 1 0 0 0 0 0 1 1 0 0 1 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 1 0 1 1 0 0 1 1 0 0 0 1 1 0 0 0 1 0 0 0 1 1 0 0 0 0 1 1 0 0 0 0 1 0 0 0 1 0 1 0 0 0 0 1 1 0 0 1 0 0 0',
            '1 0 1 1 1 0 0 0 1 0 0 0 1 0 1 1 0 0 0 1 0 0 1 1 0 0 1 0 1 0 1 0 1 1 0 1 0 0 0 0 0 0 1 1 0 1 1 1 1 0 0 0 0 0 0 0 1 1 0 0 1 0 0 0 0 1 1 1 0 1 1 0 0 0 0 0 0 1 0 0 1 0 0 0 0 0 1 0 0 1 0 0 1 0 0 0 0 0 0 0',
            '1 1 0 0 1 1 0 1 0 0 1 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 1 0 0 0 0 1 0 1 1 0 1 0 0 1 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 1 0 0 0 0 0 1 0 0 1 0 1 0 0 0 1 0 0 0 1 0 0 1',
            '1 1 0 0 0 0 1 0 0 1 1 0 1 0 0 1 0 0 0 0 0 1 0 0 1 0 0 0 0 0 0 0 1 1 0 0 1 0 0 0 0 0 0 1 0 1 1 1 0 0 0 0 1 1 0 0 0 0 0 0 1 1 1 0 0 0 1 1 0 0 0 0 0 0 0 1 0 1 0 0 0 0 0 0 1 0 1 1 1 0 1 0 0 0 0 0 0 1 0 0',
            '0 1 0 1 0 1 1 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 1 0 0 1 1 0 1 0 0 0 0 1 1 0 1 0 0 0 0 1 0 0 1 0 0 0 0 0 0 1 1 1 0 1 1 0 0 1 0 1 1 0 1 0 0 0 0 0 1 0 0 1 0 0 0 1 0 0 0 0 0 1 1 0 0 1 1 1 0 0 0 0 1 1 1',
            '1 0 0 0 1 0 1 0 0 0 0 0 1 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 1 0 1 0 1 0 1 1 0 0 0 0 1 1 0 0 0 0 0 0 0 1 0 0 1 0 1 0 0 0 1 0 0 1 0 1 0 0 1 0 0 0 0 0 1 0 1 0 1 1 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0',
            '0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0 0 0 1 0 1 0 1 0 1 0 0 1 1 0 0 0 0 1 0 0 0 0 1 0 1 0 1 1 0 0 0 0 0 1 0 0 0 0 1 1 1 0 1 0 0 0 0 1 0 0 0 0 1 0 0 1 0 1 0 0 0 1 1 0 1 1 0 0 0 1 0 0 0',
            '0 0 0 0 1 0 0 1 1 1 1 1 1 1 0 0 0 0 1 1 0 0 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 1 1 1 1 0 0 0 0 0 0 0 0 1 0 0 1 1 0 1 1 0 0 0 0 1 0 1 0 1 0 0 0 1 0 0 0 1 0 1 1 0 0 1 1 0 1 0 1 1 0 0 0 1 0 0',
            '0 0 0 1 0 0 0 0 1 0 0 1 1 1 1 0 0 0 0 0 1 0 0 0 1 0 1 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 1 1 0 0 1 1 1 0 0 1 0 0 1 1 0 0 0 1 1 0 0 1 1 0 0 0 1 0 1 0 0 0 0 0 1 0 0 1 0 0 1 0 0 0 0 0 0 0 0 1 1 0 1',
            '0 0 0 1 1 0 0 0 0 0 0 0 1 0 1 1 1 0 0 0 0 0 0 0 1 0 0 1 0 1 1 0 0 0 0 1 1 0 0 1 0 0 0 0 0 0 0 0 0 0 1 0 1 1 0 1 1 1 0 0 1 0 0 0 0 0 0 0 0 1 0 0 1 0 0 1 1 1 1 0 0 1 0 1 0 0 1 0 0 0 1 0 0 0 1 1 1 0 1 0',
            '0 0 0 0 0 0 0 1 0 0 0 0 1 1 1 1 0 0 0 0 0 0 1 0 1 1 1 1 0 0 0 1 1 1 0 0 1 0 0 1 0 0 0 0 0 0 0 0 0 1 1 0 1 1 0 0 0 0 1 0 1 0 0 0 0 0 0 1 1 0 1 0 0 0 1 0 0 0 1 0 0 0 1 0 0 1 1 1 0 1 1 0 1 1 1 1 0 0 0 0',
            '0 0 1 0 0 0 0 0 0 1 0 0 0 0 1 1 0 0 0 0 0 0 0 1 1 0 0 0 0 1 1 0 1 0 0 0 0 0 0 0 1 0 1 0 0 0 0 0 1 0 0 0 1 1 0 1 1 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0',
            '0 0 0 0 0 1 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 1 0 0 1 0 1 0 0 1 1 1 0 0 0 0 1 0 0 1 0 1 1 1 0 0 1 0 0 0 0 1 0 1 1 0 0 0 0 1 0 0 0 0 0 1 1 1 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0',
            '1 0 0 1 1 1 0 1 0 0 0 0 0 0 0 1 0 0 0 0 1 0 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 1 0 1 0 0 0 0 1 0 0 1 1 0 0 1 1 0 1 0 0 0 1 0 0 0 0 1 1 0 0 0 0 0 0 0 0 1 1 0 1 0 0 0 1 0 0 1 1 0 0 0 0 1 1 1 0 1 0 0 0 1 0 0',
            '0 0 0 0 0 0 0 1 1 1 1 1 1 0 0 0 1 1 0 0 1 0 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0 0 1 1 0 0 1 1 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 1 0 1 1 0 1 0 0 0 1 0 0 1 0 0 1 1 0',
            '0 0 0 0 1 0 1 0 1 0 1 0 1 1 1 1 0 0 0 1 0 0 1 1 1 1 1 0 1 1 1 0 0 0 0 1 0 0 0 1 0 0 0 0 0 0 0 0 0 1 1 1 0 1 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0 1 1 0 1 1 0 0 1 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0',
            '0 1 1 0 1 0 0 0 0 0 0 1 0 0 0 1 1 0 1 0 1 1 0 0 0 0 1 0 0 0 0 0 0 1 0 1 0 1 1 1 0 0 0 0 0 0 0 0 1 0 0 1 0 1 0 0 0 0 1 0 0 0 0 1 1 1 0 0 0 0 0 0 0 1 1 0 0 0 1 0 1 0 0 0 0 0 1 0 0 0 0 1 1 0 0 0 0 0 0 0',
            '0 0 0 0 1 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 1 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 1 1 0 0 1 0 1 0 0 0 0 1 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 1 0 1 1 0 1 0 0 0 0 0 0 1 1 0 0 1 1 1 1 0 1 0 1 1 0',
            '0 0 0 0 0 0 0 0 0 0 0 1 1 0 1 0 0 0 1 1 0 0 0 1 1 1 0 1 0 1 1 0 0 1 1 0 0 0 0 0 0 1 0 0 0 1 1 1 0 0 0 0 1 0 0 0 0 1 0 0 1 1 0 0 0 0 0 1 0 0 0 1 0 1 0 0 0 0 0 1 1 1 1 0 0 0 0 1 1 0 0 1 0 1 0 1 0 0 0 0',
            '0 0 1 0 1 0 0 1 0 0 0 1 0 0 0 0 1 0 0 1 0 1 1 0 0 0 0 0 1 0 0 1 1 0 0 1 0 0 0 0 0 0 1 0 1 0 1 1 0 0 1 1 0 0 0 0 0 0 1 0 1 0 0 0 0 1 0 0 0 0 1 1 0 0 1 0 0 0 1 0 1 0 1 0 0 0 0 0 1 1 1 0 0 1 0 1 0 0 0 0',
            '0 0 1 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 1 0 1 0 0 0 1 0 0 0 1 0 1 0 0 0 1 1 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 1 0 1 1 1 1 0 0 0 0 0 0 0 1 1 0 1 0 1 0 1 1 1 0 0 0 0 0 0 0 0 1 0 0 0 1 1 0 0 0 0 1',
            '0 0 0 1 1 0 0 1 0 0 0 0 1 0 0 0 1 1 0 0 0 0 0 0 0 1 0 1 0 0 0 0 0 1 0 1 1 0 0 0 1 0 0 1 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 1 0 0 0 1 0 1 1 0 0 1 0 1 0 0 0 1 0 1 0 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 1 0',
            '0 0 1 0 0 1 0 1 1 1 1 0 0 0 0 0 1 1 1 0 0 0 0 0 1 0 0 0 0 1 0 0 1 1 0 0 0 1 1 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 1 0 0 0 0 1 0 0 0 0 0 1 0 0 1 1 0 0 0 1 0 1 0 0 1 0 0 1 0 0 1 0 0 0 0 0 1 0 0 0 0 1',
            '1 0 1 0 1 0 0 1 1 0 0 1 1 0 1 0 0 1 0 0 1 0 0 0 0 0 1 0 1 0 0 0 0 0 1 0 0 0 0 0 0 1 0 1 1 0 0 0 1 1 1 0 1 1 1 0 0 1 0 0 0 0 1 1 1 0 0 0 0 1 1 0 0 1 0 0 1 0 0 0 0 1 0 0 0 1 0 1 0 0 1 0 0 1 1 0 1 1 1 0',
            '0 1 1 0 0 0 0 1 1 1 0 1 1 0 0 0 1 1 1 0 0 0 1 0 1 0 0 0 0 1 0 0 0 0 1 0 1 0 0 1 0 0 0 1 1 1 1 0 0 0 0 0 0 0 1 1 1 0 0 1 0 1 1 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 1 1 0 0 0 1 0 0 1 1 0 1 0 0 0 0 0 1 1 0 0 0',
            '0 0 0 0 0 1 0 0 0 1 0 1 0 0 0 0 0 1 0 0 0 0 0 1 1 0 1 0 0 1 0 0 0 0 0 1 0 0 0 1 1 1 1 1 0 0 0 0 0 1 0 0 1 0 0 0 0 1 0 0 0 0 0 0 1 0 0 1 1 0 1 0 1 0 0 1 0 0 0 0 1 1 1 1 1 0 0 1 1 0 1 1 1 0 0 1 0 1 1 1',
            '0 0 0 0 1 0 0 0 0 1 1 0 0 0 0 0 0 0 0 1 0 0 1 1 0 0 0 0 1 0 0 1 1 1 0 0 0 1 0 0 0 1 0 0 0 0 1 1 1 0 0 0 0 1 1 0 0 0 0 0 1 0 0 0 0 1 1 0 1 0 1 0 0 0 0 0 0 1 0 0 0 1 0 0 1 1 0 1 1 0 0 1 0 0 0 0 0 0 0 0',
            '0 0 0 1 0 0 0 0 1 0 0 0 1 0 0 1 0 0 0 0 0 1 0 0 0 1 1 0 0 1 0 0 0 0 1 1 1 0 1 1 1 0 0 0 0 0 0 0 0 0 0 1 0 1 0 0 0 1 0 0 0 0 0 0 0 0 1 1 0 0 0 1 0 0 1 0 1 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0',
            '0 0 1 0 0 0 0 0 0 1 0 0 0 1 1 0 0 0 0 1 1 0 1 1 0 0 1 0 0 0 0 1 0 0 0 0 1 0 1 1 0 1 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 1 0 1 0 0 1 0 0 0 1 1 0 1 0 1 1 0 0 1 0 0 0 0 0 1 1 0 1 0 0 0 1 0 0 0 0 0',
            '1 1 0 1 0 0 0 0 1 0 0 1 0 1 0 0 1 1 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0 1 1 1 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 1 0 1 1 0 1 1 0 1 0 0 0 0 1 0 0 0 1 0 0 0 1 0 0 1 0 0 0 0 1 0 0 0 1 1 0',
            '0 0 0 0 1 1 1 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 1 0 0 1 0 0 1 0 0 0 0 0 0 1 0 1 0 0 1 1 1 1 0 1 0 0 0 1 0 0 0 0 1 1 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 1 0 0 1 1 1 0 0 0 0 1 1 0 1 0 0 0 0 1',
            '1 0 1 0 0 1 1 1 0 0 0 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0 1 1 0 0 0 0 0 1 0 0 1 0 1 0 0 0 0 1 0 1 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 1 0 0 1 0 1 0 0 0 0 0 0 0 0 1 1 0 0 0 1 0 1 0 1 0 0 0 0 1 0 0 0 0 1 0',
            '0 1 0 0 0 0 1 1 1 0 1 0 0 0 0 0 0 0 1 1 0 1 0 0 0 0 1 0 1 1 1 0 1 0 0 0 1 1 1 1 0 1 0 0 0 0 0 0 1 0 1 0 1 1 0 0 0 1 0 1 0 0 0 1 0 0 0 0 1 1 0 0 0 1 0 0 0 1 1 0 0 0 0 1 0 0 0 0 1 0 0 1 0 1 0 0 1 1 0 0',
        ]
        with patch('builtins.input', side_effect=user_input):
            self.assertEqual(task_4.main(), 1247)
