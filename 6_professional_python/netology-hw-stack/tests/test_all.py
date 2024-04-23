import pytest

from contextlib import redirect_stdout
from io import StringIO
from solving_parentheses import check_staples


@pytest.mark.parametrize(
    ['staples', 'expected'],
    (
        ['(((([{}]))))', 'Сбалансированно'],
        ['[([])((([[[]]])))]{()}', 'Сбалансированно'],
        ['{{[()]}}', 'Сбалансированно'],
        ['}{}', 'Несбалансированно'],
        ['{{[(])]}}', 'Несбалансированно'],
        ['[[{())}]', 'Несбалансированно'],
        ['{{{(([{})))}}', 'Несбалансированно']
    )
)
def test_check_staples(staples: str, expected: str) -> None:
    stdout_text = StringIO()
    with redirect_stdout(stdout_text):
        check_staples(staples)
    value = stdout_text.getvalue().strip()
    assert value == expected
    
