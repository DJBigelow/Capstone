from ensurepip import version
from setuptools import setup, find_packages

setup(
    name='portal',
    version="0.1.0",
    packages=find_packages('api')
)