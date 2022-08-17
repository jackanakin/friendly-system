

"""
Django settings for snmpagent project.
Generated by 'django-admin startproject' using Django 2.1.1.
For more information on this file, see
https://docs.djangoproject.com/en/2.1/topics/settings/
For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.1/ref/settings/
"""

import os
import app
import configparser

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
APP_DIR = pth = os.path.dirname(app.__file__)

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
#DEBUG = False

# ENV FILE LOAD
config_file_path = os.path.join(BASE_DIR, 'settings.ini')
config = configparser.RawConfigParser()
config.read(config_file_path)
print("Loading Enviroment Configuration File: " + config_file_path)

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config.get('system', 'SECRET_KEY')

# Application definition

INSTALLED_APPS = [
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'app'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'snmpagent.urls'

WSGI_APPLICATION = 'snmpagent.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': config.get('MAINDB', 'ENGINE'),
        'NAME': config.get('MAINDB', 'NAME'),
        'USER': config.get('MAINDB', 'USER'),
        'PASSWORD': config.get('MAINDB', 'PASSWORD'),
        'HOST': config.get('MAINDB', 'HOST'),
        'PORT': config.get('MAINDB', 'PORT'),
    },
    'ERPDB': {
        'ENGINE': config.get('ERPDB', 'ENGINE'),
        'NAME': config.get('ERPDB', 'NAME'),
        'USER': config.get('ERPDB', 'USER'),
        'PASSWORD': config.get('ERPDB', 'PASSWORD'),
        'HOST': config.get('ERPDB', 'HOST'),
        'PORT': config.get('ERPDB', 'PORT'),
    }
}

# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = config.get('system', 'TIME_ZONE')

USE_I18N = True

USE_L10N = True

USE_TZ = True