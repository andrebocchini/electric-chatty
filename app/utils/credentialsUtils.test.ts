import keytar from 'keytar';
import {
  deleteCredentialsFromSecureStorage,
  fetchCredentialsFromSecureStorage,
  saveCredentialsToSecureStorage,
} from './credentialsUtils';

jest.mock('keytar');

const mockKeytar = keytar as jest.Mocked<typeof keytar>;

describe('Credentials utils', () => {
  it('should delete credentials from secure storage', async () => {
    const credentialsInStorage = [
      {
        account: 'username1',
        password: 'password1',
      },
      {
        account: 'username2',
        password: 'password2',
      },
    ];
    mockKeytar.findCredentials.mockResolvedValue(credentialsInStorage);
    mockKeytar.deletePassword.mockResolvedValue(true);

    await deleteCredentialsFromSecureStorage();
    expect(mockKeytar.findCredentials).toBeCalledTimes(1);
    expect(mockKeytar.deletePassword).toBeCalledTimes(2);
  });

  it('should fail to delete credentials from secure storage', async () => {
    const credentialsInStorage = [
      {
        account: 'username1',
        password: 'password1',
      },
    ];
    mockKeytar.findCredentials.mockResolvedValue(credentialsInStorage);
    mockKeytar.deletePassword.mockResolvedValue(false);

    await expect(deleteCredentialsFromSecureStorage()).rejects.toThrow(
      new Error('Failed to delete credentials from storage')
    );
  });

  it('should successfully retrieve password from secure storage', async () => {
    mockKeytar.findCredentials.mockResolvedValue([
      { account: 'username', password: 'password' },
    ]);

    await expect(fetchCredentialsFromSecureStorage()).resolves.toEqual({
      username: 'username',
      password: 'password',
    });
  });

  it('should not find password in secure storage for user', async () => {
    mockKeytar.findCredentials.mockResolvedValue([]);
    await expect(fetchCredentialsFromSecureStorage()).resolves.toBeUndefined();
  });

  it('should successfully save credentials to secure storage', async () => {
    mockKeytar.setPassword.mockResolvedValue();

    const credentials = {
      username: 'username',
      password: 'password',
    };

    await expect(saveCredentialsToSecureStorage(credentials)).resolves.toEqual(
      true
    );
  });

  it('should fail to save credentials to secure storage', async () => {
    mockKeytar.setPassword.mockRejectedValue(new Error());

    const credentials = {
      username: 'username',
      password: 'password',
    };

    await expect(saveCredentialsToSecureStorage(credentials)).rejects.toThrow(
      new Error('Failed to save credentials to secure storage')
    );
  });
});
