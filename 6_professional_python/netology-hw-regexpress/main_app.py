import csv
import itertools
import re


def get_contacts_list(csv_file: str) -> list:
    with open(csv_file, encoding='utf-8') as f:
        return list(csv.reader(f, delimiter=','))

def edit_phone_number(phone_number: str,
                      some_pattern: re.Pattern) -> str:
    phone_format = r'+7(\2)\3-\4-\5 \7\8'
    return some_pattern.sub(phone_format, phone_number).strip()

def merge_groups_contacts(group: list) -> list:
    contact_list = [''.join(set(e)) for e in zip(*group)]
    return contact_list

def write_csv_file(csv_file: str, contacts_list: list[str]):
    with open(csv_file, 'w', encoding='utf-8', newline='') as f:
        csv_writer = csv.writer(f, delimiter=',')
        csv_writer.writerows(contacts_list)

if __name__ == '__main__':
    input_csv_file = 'phonebook_raw.csv'
    output_csv_file = 'phonebook.csv'
    correct_contacts_list = []
    cur_pattern = r'(\+7|8)?\s*\(?(\d{3})\)?[\s-]?(\d{3})-?(\d{2})-?(\d{2})(\s*\(?(доб\.)?\s(\d{4})\)?)?'
    pattern = re.compile(cur_pattern)

    contacts_list = get_contacts_list(input_csv_file)
    for person in contacts_list[1:]:
        person[-2] = edit_phone_number(person[-2], pattern)
        full_name = ' '.join(person[:3]).split()
        person[:len(full_name)] = full_name
    contacts_list = sorted(contacts_list, key=lambda x: x)
    for key, group in itertools.groupby(contacts_list,
                                        key=lambda x: (x[0], x[1])):
        correct_contacts_list.append(merge_groups_contacts(group))
    write_csv_file(output_csv_file, correct_contacts_list)
    