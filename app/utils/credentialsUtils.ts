import keytar from 'keytar';
import Credentials from '../types/Credentials';

const SERVICE = 'ElectricChatty';

export async function deleteCredentialsFromSecureStorage(): Promise<void> {
  const credentials = await keytar.findCredentials('ElectricChatty');

  const asyncOperations = [];
  for (const credential of credentials) {
    const { account } = credential;
    asyncOperations.push(keytar.deletePassword(SERVICE, account));
  }

  const asyncOperationResults = await Promise.all(asyncOperations);
  if (asyncOperationResults.includes(false)) {
    throw new Error('Failed to delete credentials from storage');
  }
}

export async function fetchCredentialsFromSecureStorage(): Promise<
  Credentials | undefined
> {
  try {
    const results = await keytar.findCredentials(SERVICE);
    if (results && results.length > 0) {
      const result = results[0];
      return {
        username: result.account,
        password: result.password,
      };
    }

    return undefined;
  } catch (error) {
    throw new Error(`Error when retrieving password in secure storage`);
  }
}

export async function saveCredentialsToSecureStorage(
  credentials: Credentials
): Promise<boolean> {
  try {
    await keytar.setPassword(
      SERVICE,
      credentials.username,
      credentials.password
    );
  } catch (error) {
    throw new Error('Failed to save credentials to secure storage');
  }
  return true;
}
