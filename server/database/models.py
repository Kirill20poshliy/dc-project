from django.db import models

class User(models.Model):
    user_id = models.AutoField(primary_key=True)  # Уникальный идентификатор пользователя
    first_name = models.CharField(max_length=255)  # Имя пользователя
    last_name = models.CharField(max_length=255)  # Фамилия пользователя
    middle_name = models.CharField(max_length=255)  # Отчество пользователя
    email = models.CharField(max_length=255)  # Почта пользователя
    password = models.CharField(max_length=255)  # Пароль пользователя
    USER_TYPES = [
        ('студент', 'Студент'),
        ('сотрудник', 'Сотрудник'),
    ]
    user_type = models.CharField(max_length=255, choices=USER_TYPES)  # Тип пользователя: 'студент' или 'сотрудник'

    def __str__(self):
        return f"{self.last_name} {self.first_name}"

class Message(models.Model):
    message_id = models.AutoField(primary_key=True)  # Уникальный идентификатор сообщения
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')  # Идентификатор отправителя сообщения (ссылка на поле user_id в таблице Users)
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')  # Идентификатор получателя сообщения (ссылка на поле user_id в таблице Users)
    subject = models.CharField(max_length=255)  # Тема сообщения
    body = models.TextField()  # Текст сообщения
    date_sent = models.DateTimeField()  # Дата и время отправки сообщения
    date_read = models.DateTimeField(null=True)  # Дата и время прочтения сообщения (может быть NULL, если сообщение не прочитано)
    MESSAGE_STATUSES = [
        ('прочитано', 'Прочитано'),
        ('не прочитано', 'Не прочитано'),
    ]
    status = models.CharField(max_length=255, choices=MESSAGE_STATUSES)  # Статус сообщения: 'прочитано' или 'не прочитано'
    important = models.BooleanField()  # Флаг важности сообщения: True - важное, False - не важное

    def __str__(self):
        return self.subject

class MessageAttachment(models.Model):
    attachment_id = models.AutoField(primary_key=True)  # Уникальный идентификатор вложения
    message = models.ForeignKey(Message, on_delete=models.CASCADE)  # Идентификатор сообщения, к которому прикреплено вложение (ссылка на поле message_id в таблице Messages)
    file_name = models.CharField(max_length=255)  # Имя файла вложения
    file_type = models.CharField(max_length=255)  # Тип файла (например, 'фото', 'видео', 'документ' и т.д.)
    file_path = models.FilePathField(blank=False)  # Путь к файлу вложения на сервере (может быть строкой или BLOB для хранения файлов напрямую в базе данных)

    def __str__(self):
        return self.file_name

class DeletedMessage(models.Model):
    message = models.OneToOneField(Message, primary_key=True, on_delete=models.CASCADE)  # Идентификатор удаленного сообщения (ссылка на поле message_id в таблице Messages)
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Идентификатор пользователя, который удалил сообщение (ссылка на поле user_id в таблице Users)

    def __str__(self):
        return f"Deleted: {self.message.subject}"