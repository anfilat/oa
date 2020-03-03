import unittest
from unittest.mock import patch
import big_1


class TestBig1(unittest.TestCase):
    def test_0(self):
        user_input = [
            '4 3',
            '0 0 0 0',
            '0 1 0 0',
            '1 0 0 0',
        ]
        with patch('builtins.input', side_effect=user_input):
            self.assertEqual(big_1.main(), 6)

    def test_1(self):
        user_input = [
            '1 1',
            '0',
        ]
        with patch('builtins.input', side_effect=user_input):
            self.assertEqual(big_1.main(), 1)

    def test_2(self):
        user_input = [
            '4 4',
            '1 0 0 1',
            '0 0 0 1',
            '0 0 0 0',
            '0 0 0 1',
        ]
        with patch('builtins.input', side_effect=user_input):
            self.assertEqual(big_1.main(), 9)

    def test_3(self):
        user_input = [
            '4 4',
            '0 1 0 0',
            '0 1 0 0',
            '0 0 0 0',
            '1 0 0 1',
        ]
        with patch('builtins.input', side_effect=user_input):
            self.assertEqual(big_1.main(), 6)

    def test_4(self):
        user_input = [
            '3 2',
            '1 1 1',
            '1 1 1',
        ]
        with patch('builtins.input', side_effect=user_input):
            self.assertEqual(big_1.main(), 0)

    def test_5(self):
        user_input = [
            '5 4',
            '1 0 1 0 1',
            '0 1 0 1 0',
            '1 0 1 0 1',
            '0 1 0 1 0',
        ]
        with patch('builtins.input', side_effect=user_input):
            self.assertEqual(big_1.main(), 1)

    def test_6(self):
        user_input = [
            '10 10',
            '0 0 0 0 0 0 0 0 0 0',
            '0 0 0 0 0 0 0 0 0 0',
            '0 0 0 0 0 0 0 0 0 0',
            '0 0 0 0 0 0 0 0 0 0',
            '0 0 0 0 0 0 0 0 0 0',
            '0 0 0 0 0 0 0 0 0 0',
            '0 0 0 0 0 0 0 0 0 0',
            '0 0 0 0 0 0 0 0 0 0',
            '0 0 0 0 0 0 0 0 0 0',
            '0 0 0 0 0 0 0 0 0 0',
        ]
        with patch('builtins.input', side_effect=user_input):
            self.assertEqual(big_1.main(), 100)

    def test_7(self):
        user_input = [
            '8 1',
            '0 0 0 0 0 1 0 0',
        ]
        with patch('builtins.input', side_effect=user_input):
            self.assertEqual(big_1.main(), 5)

    def test_8(self):
        user_input = [
            '30 30',
            '1 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 1 1 1',
            '0 1 0 0 0 0 0 1 0 0 0 1 0 1 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0',
            '0 0 0 0 0 0 0 0 0 1 1 0 1 0 1 0 0 0 1 0 1 0 0 0 0 0 0 0 1 0',
            '1 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 1 0 1 0 1 0 1 0 0 0 0 1 0 0',
            '0 0 0 1 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 1 1 0 0 0',
            '1 1 1 1 0 1 0 0 0 0 0 0 0 0 0 1 0 1 0 0 0 1 1 1 0 0 0 0 0 0',
            '0 0 1 0 1 0 0 1 0 0 0 0 0 0 1 1 0 0 0 0 0 1 0 1 1 1 0 0 0 0',
            '0 1 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 1',
            '0 0 0 1 1 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0 0 1 0 0 0 0 0',
            '0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0',
            '0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0',
            '0 0 0 0 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 1 0 0 1 1 1 1 1 0 0 0',
            '1 1 1 1 0 0 0 1 1 1 1 1 1 1 0 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0',
            '0 1 1 1 0 1 1 0 0 0 0 0 0 0 1 1 0 0 0 0 1 0 0 0 1 0 0 0 1 0',
            '0 0 0 0 0 1 1 1 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 1 0 0 1 1',
            '0 0 0 0 0 0 0 1 0 1 1 0 0 0 0 0 0 0 0 0 1 0 1 0 0 0 0 0 1 0',
            '0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0',
            '1 1 1 1 1 0 0 0 0 0 1 0 0 1 1 0 0 0 0 0 1 0 0 1 0 0 0 0 0 0',
            '0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 1 0 0',
            '0 1 0 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 1 0 1 1 0 0 0 0 0 0',
            '0 1 0 0 0 0 0 0 1 0 0 0 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 1 0 0',
            '1 0 0 0 0 0 0 0 0 0 0 0 1 0 0 1 1 0 0 0 0 1 0 1 1 0 0 0 0 0',
            '0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 1 1 0 0 0 0',
            '0 1 0 0 0 0 1 0 1 0 0 0 0 0 0 0 1 0 0 0 1 0 0 1 1 0 0 0 0 0',
            '0 0 0 1 0 0 1 1 0 0 0 0 0 0 0 1 0 0 1 0 0 0 1 1 0 1 0 0 0 0',
            '0 0 0 0 0 1 1 0 0 0 0 1 0 1 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0',
            '0 0 0 0 0 1 1 0 0 0 1 0 0 0 1 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0',
            '0 0 0 1 0 1 0 0 0 0 1 0 1 1 0 1 0 1 0 0 0 0 1 1 0 0 0 1 0 0',
            '1 1 0 0 1 0 0 0 1 1 0 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 1 0 0',
            '0 1 0 0 0 0 0 1 0 1 0 0 1 0 0 0 1 1 0 0 0 0 0 0 0 0 1 1 0 0',
        ]
        with patch('builtins.input', side_effect=user_input):
            self.assertEqual(big_1.main(), 33)

    def test_9(self):
        user_input = [
            '4 4',
            '1 0 0 0',
            '0 1 0 0',
            '0 0 0 1',
            '0 0 0 0',
        ]
        with patch('builtins.input', side_effect=user_input):
            self.assertEqual(big_1.main(), 6)

