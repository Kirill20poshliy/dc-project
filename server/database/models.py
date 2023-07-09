"""
Модели для внутренней почты.

Файл содержит определение трех моделей: UserProfile, Message и Attachment,
которые используются для создания внутренней почты и связанных с ней объектов.


Модель для профиля пользователя.

    Поля:
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
from django.utils import timezone


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50)
    # login = models.CharField(max_length=50)
    # password = models.CharField(max_length=50)
    TYPE_CHOICES = (
        ('student', 'Студент'),
        ('employee', 'Сотрудник'),
    )
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)


def get_attachment_upload_path(instance, filename): #https://docs.djangoproject.com/en/4.2/ref/models/fields/#django.db.models.FileField.upload_to:~:text=The%20primary_key%20argument%20isn%E2%80%99t%20supported%20and%20will%20raise%20an%20error%20if%20used.
    return 'attachments/{0}/{1}'.format(
        hash(filename),
        filename,
    )


class Message(models.Model):
    message_id = models.AutoField(primary_key=True)
    sender = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='sent_messages')
    recipient = models.ForeignKey(UserProfile, on_delete=models.SET_NULL, null=True, related_name='received_messages')
    date_received = models.DateTimeField(auto_now_add=True)
    subject = models.CharField(max_length=50)
    body = models.TextField()
    date_sent = models.DateTimeField(default=timezone.now)
    date_read = models.DateTimeField(null=True)
    MESSAGE_STATUSES = [
        ('прочитано', 'Прочитано'),
        ('не прочитано', 'Не прочитано'),
    ]
    status = models.BooleanField(default=False)
    important = models.BooleanField(default=False)
    deleted = models.BooleanField(default=False)
    deleted_sender = models.BooleanField(default=False)
    deleted_recipient = models.BooleanField(default=False)
    # attach = models.FileField(
    #     upload_to=get_attachment_upload_path,
    #     null=True,
    #     blank=True,
    #                           )
    attach = models.ManyToManyField('Attachment', verbose_name="attachment")
    
    def __str__(self):
        return self.subject


class Attachment(models.Model):
    # message = models.ForeignKey(Message, on_delete=models.CASCADE, related_name='attachments')
    # pk = models.AutoField(unique=True)
    file = models.FileField(upload_to=get_attachment_upload_path)
    file_name = models.CharField(max_length=50)
    file_type = models.CharField(max_length=20)

    def __str__(self):
        return self.file_name