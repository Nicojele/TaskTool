"use server";

import { Identity } from '@5minds/processcube_engine_sdk';
import jwtDecode from 'jwt-decode';
import logger from '../../../lib/server-logger';
import { navigateToUrl, startProcess } from '@5minds/processcube_app_sdk/server';
import { EngineClient } from '@5minds/processcube_engine_client';

async function getProcessInstancess(processmodelId: string) {
  const engineUrl = 'http://localhost:8000';

  console.log("engine URL erstellt")

  const client = new EngineClient(engineUrl);
  
  console.log("engine Client erstellt")

  const test = await client.processInstances.query({
    processModelId: processmodelId,
  });

  console.log("Querry is working");
}
 
export async function startTaskProcess(): Promise<void> {
  const identity = await getIdentity();
  console.log(identity);
  await startProcess({ processModelId: "createTask_Process" }, identity);
  
  await getProcessInstancess("createTask_Process");
  // navigateToUrl(`http://localhost:56010/task/82192db7-a4d5-48a6-b372-0e33d3669747/fbe1513e-a37a-4a69-b220-e9639c702419/ef2e9514-c1f0-4539-b3ed-92daf6fe1777`);
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
