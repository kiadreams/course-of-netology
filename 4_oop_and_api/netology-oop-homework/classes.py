class Student:

    def __init__(self, name, surname, gender):
        self.name = name
        self.surname = surname
        self.gender = gender
        self.finished_courses = []
        self.courses_in_progress = []
        self.grades = {}

    def add_finished_course(self, course):
        if course in self.courses_in_progress:
            self.finished_courses.append(course)
            self.courses_in_progress.remove(course)
        else:
            return 'Ошибка: студент на данном курсе не учился'

    def rate_lecture(self, lecture, course, grade):
        if (isinstance(lecture, Lecturer)
                and course in self.courses_in_progress
                and course in lecture.courses_attached):
            lecture.grades.setdefault(course, []).append(grade)
        else:
            return 'Ошибка: неверные данные при оценке лектора'

    def __str__(self):
        return (f'Имя: {self.name}\n'
                f'Фамилия: {self.surname}\n'
                'Средняя оценка за домашние задания: '
                f'{self._get_average_grade():g}\n'
                'Курсы в процессе изучения: '
                f'{', '.join(self.courses_in_progress)}\n'
                f'Завершенные курсы: {', '.join(self.finished_courses)}')

    def __eq__(self, other):
        if isinstance(other, Student):
            return self._get_average_grade() == other._get_average_grade()
        else:
            return 'Ошибка: объект сравнения не относится к классу Student'

    def __lt__(self, other):
        if isinstance(other, Student):
            return self._get_average_grade() < other._get_average_grade()
        else:
            return 'Ошибка: объект сравнения не относится к классу Student'

    def __le__(self, other):
        if isinstance(other, Student):
            return self._get_average_grade() <= other._get_average_grade()
        else:
            return 'Ошибка: объект сравнения не относится к классу Student'

    def _get_average_grade(self):
        all_grades = sum(self.grades.values(), [])
        if all_grades:
            return sum(all_grades) / len(all_grades)
        else:
            return 0


class Mentor:

    def __init__(self, name, surname):
        self.name = name
        self.surname = surname
        self.courses_attached = []

    def __str__(self):
        return (f'Имя: {self.name}\n'
                f'Фамилия: {self.surname}')


class Lecturer(Mentor):

    def __init__(self, name, surname):
        super().__init__(name, surname)
        self.grades = {}

    def __str__(self):
        return (super().__str__()
                + '\nСредняя оценка за лекции: '
                  f'{self._get_average_grade():g}')

    def __eq__(self, other):
        if isinstance(other, Lecturer):
            return self._get_average_grade() == other._get_average_grade()
        else:
            return 'Ошибка: объект сравнения не относится к классу Student'

    def __lt__(self, other):
        if isinstance(other, Lecturer):
            return self._get_average_grade() < other._get_average_grade()
        else:
            return 'Ошибка: объект сравнения не относится к классу Student'

    def __le__(self, other):
        if isinstance(other, Lecturer):
            return self._get_average_grade() <= other._get_average_grade()
        else:
            return 'Ошибка: объект сравнения не относится к классу Student'

    def _get_average_grade(self):
        all_grades = sum(self.grades.values(), [])
        if all_grades:
            return sum(all_grades) / len(all_grades)
        else:
            return 0


class Reviewer(Mentor):

    def rate_hw(self, student, course, grade):
        if (isinstance(student, Student)
                and course in self.courses_attached
                and course in student.courses_in_progress):
            student.grades.setdefault(course, []).append(grade)
        else:
            return 'Ошибка: неверные данные при оценке студента'


def aver_stud_grade(students, course):
    grades_course_hw = [grade for st in students
                        if course in st.courses_in_progress
                        for grade in st.grades.get(course, [])]
    if grades_course_hw:
        return sum(grades_course_hw) / len(grades_course_hw)
    else:
        return 0


def aver_lec_grade(lecturers, course):
    grades_course_lec = [grade for lec in lecturers
                         if course in lec.courses_attached
                         for grade in lec.grades.get(course, [])]
    if grades_course_lec:
        return sum(grades_course_lec) / len(grades_course_lec)
    else:
        return 0


a_st = Student('A_Student', 'S_first', 'male')
a_st.courses_in_progress += ['Python', 'Git']
a_st.grades['Git'] = [10, 8, 10, 10, 8]
a_st.grades['Python'] = [10, 9]

b_st = Student('B_Student', 'S_second', 'male')
b_st.courses_in_progress += ['Python', 'Git']
b_st.grades['Git'] = [10, 10, 8, 8, 10]
b_st.grades['Python'] = [10, 9]


a_lec = Lecturer('A_Lecturer', 'L_first')
a_lec.courses_attached += ['Python']

b_lec = Lecturer('B_Lecturer', 'L_second')
b_lec.courses_attached += ['Python', 'Git']

a_rev = Reviewer('A_Reviewer', 'R_first')
a_rev.courses_attached += ['Python']

b_rev = Reviewer('B_Reviewer', 'R_second')
b_rev.courses_attached += ['Python', 'Git']

print(a_st, '\n')
b_rev.rate_hw(a_st, 'Git', 8)
a_st.add_finished_course('Git')
print('Студент A закончил курс по Git...')

print(a_st, '\n')
print(b_st)
print('a_st == b_st:', a_st == b_st)
print('a_st != b_st:', a_st != b_st)
print('a_st > b_st:', a_st > b_st)
print('a_st < b_st:', a_st < b_st)
print('a_st <= b_st:', a_st <= b_st)
print('a_st >= b_st:', a_st >= b_st, '\n')

print(a_lec)
a_st.rate_lecture(a_lec, 'Python', 9)
b_st.rate_lecture(b_lec, 'Git', 10)
print(a_lec, '\n')
print(b_lec)
print('a_lec == b_lec:', a_lec == b_lec)
print('a_lec != b_lec:', a_lec != b_lec)
print('a_lec > b_lec:', a_lec > b_lec)
print('a_lec < b_lec:', a_lec < b_lec)
print('a_lec <= b_lec:', a_lec <= b_lec)
print('a_lec >= b_lec:', a_lec >= b_lec, '\n')
