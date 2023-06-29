"""
Модели для внутренней почты.

Файл содержит определение трех моделей: UserProfile, Message и Attachment,
которые используются для создания внутренней почты и связанных с ней объектов.


Модель для профиля пользователя.

    Поля:
    - user: связь с моделью User из Django
    - first_name: имя пользователя
    - last_name: фамилия пользователя
    - middle_name: отчество пользователя
    - login: логин пользователя
    - password: пароль пользователя
    - type: тип пользователя (Студент/Сотрудник)

Модель для сообщений.

    Поля:
    - message_id: уникальный идентификатор сообщения
    - sender: связь с моделью UserProfile для отправителя
    - recipient: связь с моделью UserProfile для получателя
    - date_received: дата получения сообщения
    - subject: тема сообщения
    - body: текст сообщения
    - date_sent: дата и время отправки сообщения
    - date_read: дата и время прочтения сообщения (может быть NULL, если сообщение не прочитано)
    - status: статус сообщения (прочитано/не прочитано)
    - important: флаг важности сообщения

 Модель для вложений сообщений.

    Поля:
    - message: связь с моделью Message для вложения
    - file: файл вложения
    - file_name: имя файла вложения
    - file_type: тип файла
"""


from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # Связь с моделью User из Django
    first_name = models.CharField(max_length=50)  # Поле для имени пользователя
    last_name = models.CharField(max_length=50)  # Поле для фамилии пользователя
    middle_name = models.CharField(max_length=50)  # Поле для отчества пользователя
    login = models.CharField(max_length=50)  # Поле для логина пользователя
    password = models.CharField(max_length=50)  # Поле для пароля пользователя
    TYPE_CHOICES = (
        ('student', 'Студент'),
        ('employee', 'Сотрудник'),
    )
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)  # Поле для типа пользователя

class Message(models.Model):
    message_id = models.AutoField(primary_key=True)
    sender = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='sent_messages')
    recipient = models.ForeignKey(UserProfile, on_delete=models.SET_NULL, null=True, related_name='received_messages')
    date_received = models.DateTimeField(auto_now_add=True)
    subject = models.CharField(max_length=50)
    body = models.TextField()
    date_sent = models.DateTimeField()
    date_read = models.DateTimeField(null=True)
    MESSAGE_STATUSES = [
        ('прочитано', 'Прочитано'),
        ('не прочитано', 'Не прочитано'),
    ]
    status = models.CharField(max_length=20, choices=MESSAGE_STATUSES)
    important = models.BooleanField()
    deleted = models.BooleanField(default=False)  # Поле для статуса удаления сообщения

    def __str__(self):
        return self.subject


def get_attachment_upload_path(instance, filename):
    # Формируем путь для сохранения вложения с использованием уникального идентификатора в базовой директории
    return f'attachments/{instance.message_id}/{filename}'

class Attachment(models.Model):
    message = models.ForeignKey(Message, on_delete=models.CASCADE, related_name='attachments')
    file = models.FileField(upload_to=get_attachment_upload_path)
    file_name = models.CharField(max_length=50)  # Имя файла вложения
    file_type = models.CharField(max_length=20)  # Тип файла

    def __str__(self):
        return self.file_name