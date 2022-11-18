import os

import pytest

@pytest.fixture(scope="session", autouse=True)
def set_env():
    envs = {
        'PG_HOST': 'portal_test_db',
        'PG_DB': 'TestPortal',
        'PG_USER': 'TestPortalUser',
        'PG_PASSWORD': 'testpsswd1!'
    }

    os.environ.update(envs)