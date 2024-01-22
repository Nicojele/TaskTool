"use server";

import { Identity } from '@5minds/processcube_engine_sdk';
import jwtDecode from 'jwt-decode';
import logger from '../../../lib/server-logger';
import { navigateToUrl, startProcess } from '@5minds/processcube_app_sdk/server';
 
export async function startTaskProcess(): Promise<void> {
  const identity = await getIdentity();
  console.log(identity);
  const prozessInstanze = await startProcess({ processModelId: "createTask_Process" }, identity);
  const prozessInstanzeId = prozessInstanze.processInstanceId
  navigateToUrl(`http://localhost:3000/task/${prozessInstanzeId}/create`);
}

export async function getIdentity(): Promise<Identity> {
  logger.info({}, 'Get new Identity');

  const token = await getAccessToken();
  const decodedToken = jwtDecode<Record<string, unknown>>(token);

  const identity = {
    token: token as string,
    userId: decodedToken.sub as string,
  };

  logger.info({ userId: identity.userId }, 'Return Identity for User');

  return identity;
}

export async function getAccessToken(): Promise<string> {
  logger.info({}, 'Get new AccessToken');

  const response = await fetch(`${process.env.PROCESSCUBE_AUTHORITY_URL}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow',
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.PROCESSCUBE_SERVER_CLIENT_ID || '',
      client_secret: process.env.PROCESSCUBE_SERVER_CLIENT_SECRET || '',
      scope: 'upe_admin engine_read engine_write',
    }).toString(),
    cache: 'no-store',
  });

  const responseBody = await response.json();

  logger.info({}, 'Return new AccessToken');

  return responseBody.access_token;
}
