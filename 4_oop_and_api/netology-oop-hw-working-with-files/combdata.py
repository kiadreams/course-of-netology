class FileData:
    
    def __init__(self, file_name):
        self.file_name = file_name
        self.file_data = []
        self.__read_data_from_file(file_name)

    def write_data_to_file(self, file_name, mode):
        with open(file_name, mode, encoding='utf-8') as f_output:
            f_output.write(f'{self.__str__()}\n')
            f_output.write('\n'.join(self.file_data) + '\n')

    def __str__(self):
        return f'{self.file_name}\n{len(self.file_data)}'

    def __lt__(self, other):
        if isinstance(other, FileData):
            return len(self.file_data) < len(other.file_data)
        else:
            raise TypeError('Операнд справа должен быть типа FileData')

    def __read_data_from_file(self, file_name):
        with open(file_name, encoding='utf-8') as f_input:
            data = list(f_input)
        self.file_data.extend(map(str.rstrip, data))


if __name__ == '__main__':
    file_names = ['1.txt', '2.txt', '3.txt', '4.txt']
    all_files = [FileData(name) for name in file_names]
    all_files.sort()
    res_file = 'all_data.txt'
    for i, file in enumerate(all_files):
        file.write_data_to_file(res_file, 'w' if i == 0 else 'a')
