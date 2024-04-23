import pygame

from datetime import datetime

from application.salary import calculate_salary
from application.db.people import get_employees


if __name__ == '__main__':
    cur_date = datetime.now()
    print(f'Текущая дата: {cur_date.strftime('%d.%m.%Y')}г.')
    calculate_salary()
    get_employees()
    
    def make_font(fonts, size):
        available = pygame.font.get_fonts()
        choices = map(lambda x:x.lower().replace(' ', ''), fonts)
        for choice in choices:
            if choice in available:
                return pygame.font.SysFont(choice, size)
        return pygame.font.Font(None, size)
    
    _cached_fonts = {}
    def get_font(font_preferences, size):
        global _cached_fonts
        key = str(font_preferences) + '|' + str(size)
        font = _cached_fonts.get(key, None)
        if font == None:
            font = make_font(font_preferences, size)
            _cached_fonts[key] = font
        return font
 
    _cached_text = {}
    def create_text(text, fonts, size, color):
        global _cached_text
        key = '|'.join(map(str, (fonts, size, color, text)))
        image = _cached_text.get(key, None)
        if image == None:
            font = get_font(fonts, size)
            image = font.render(text, True, color)
            _cached_text[key] = image
        return image
 
    pygame.init()
    screen = pygame.display.set_mode((800, 640))
    clock = pygame.time.Clock()
    done = False
 
    font_preferences = [
            'Bizarre-Ass Font Sans Serif',
            'They definitely dont have this installed Gothic',
            'Papyrus',
            'Comic Sans MS'
    ]
    
    text = create_text('HELLO everyone!!!', font_preferences, 72, (0, 128, 0))
 
    while not done:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                done = True
            if event.type == pygame.KEYDOWN and event.key == pygame.K_ESCAPE:
                done = True
        
        screen.fill((255, 255, 255))
        screen.blit(text,
                    (screen.get_width() // 2 - text.get_width() // 2,
                     screen.get_height() // 2 - text.get_height() // 2))
    
        pygame.display.flip()
        clock.tick(60)