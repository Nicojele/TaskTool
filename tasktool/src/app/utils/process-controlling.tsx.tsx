'use server';

import { getIdentity, getUserTasks, waitForUserTask } from '@5minds/processcube_app_sdk/server';
import { DataModels } from '@5minds/processcube_engine_sdk';

import { navigateToUrl } from '@5minds/processcube_app_sdk/server';
import logger from '../../../lib/server-logger';

export async function getUserTask(
  processInstanceId: string,
  flowNodeId: string,
): Promise<DataModels.FlowNodeInstances.UserTaskInstance> {
  logger.info({ processInstanceId: processInstanceId, flowNodeId: flowNodeId }, 'Get UserTask');

  const identity = await getIdentity();
  const filterBy = { processInstanceId: processInstanceId, flowNodeId: flowNodeId };
  const options = { identity: identity };
  
  console.log("------------------------------------------")
  console.log(filterBy);
  console.log(options)
  
  const tasklist = await getUserTasks(filterBy, options);

  console.log("------------------------------------")
  console.log(tasklist);

  const invalidProcessInstanceId = tasklist.totalCount == 0;
  if (invalidProcessInstanceId) {
    logger.info({}, 'ProcessInstanceId is invalid, navigate to Home');

    navigateToUrl("localhost:30000");
  }

  const currentTaskAlreadyFinished = tasklist.totalCount > 0 && tasklist.userTasks[0].state !== 'suspended';
  if (currentTaskAlreadyFinished) {
    logger.info({}, 'CurrentTask already finished, return last finished UserTask');

    return tasklist.userTasks[0];
  }
  const currentTask = await waitForUserTask(filterBy, identity);

  logger.info({ currentTask: currentTask }, 'Return Current UserTask');

  return currentTask;
}
