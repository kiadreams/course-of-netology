from collections import deque
from typing import Any


class Stack:
    
    def __init__(self, max_len: int | None = None) -> None:
        self._elements = deque(maxlen=max_len)
    
    def is_empty(self) -> bool:
        return not len(self._elements)
    
    def push(self, element: Any) -> None:
        self._elements.append(element)
    
    def pop(self) -> Any:
        return self._elements.pop()
    
    def peek(self) -> Any:
        return self._elements[-1]
    
    def size(self) -> int:
        return len(self._elements)
