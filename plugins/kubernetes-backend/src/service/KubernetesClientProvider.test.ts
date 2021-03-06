/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import '@backstage/backend-common';
import { KubernetesClientProvider } from './KubernetesClientProvider';

describe('KubernetesClientProvider', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('can get core client by cluster details', async () => {
    const sut = new KubernetesClientProvider();

    const mockGetKubeConfig = jest.fn(sut.getKubeConfig.bind({}));

    sut.getKubeConfig = mockGetKubeConfig;

    const result = sut.getCoreClientByClusterDetails({
      name: 'cluster-name',
      url: 'http://localhost:9999',
      serviceAccountToken: 'TOKEN',
      authProvider: 'serviceAccount',
    });

    expect(result.basePath).toBe('http://localhost:9999');
    // These fields aren't on the type but are there
    const auth = (result as any).authentications.default;
    expect(auth.users[0].token).toBe('TOKEN');
    expect(auth.clusters[0].name).toBe('cluster-name');

    expect(mockGetKubeConfig.mock.calls.length).toBe(1);
  });

  it('can get cached core client by cluster details', async () => {
    const sut = new KubernetesClientProvider();

    const mockGetKubeConfig = jest.fn(sut.getKubeConfig.bind({}));

    sut.getKubeConfig = mockGetKubeConfig;

    const result1 = sut.getCoreClientByClusterDetails({
      name: 'cluster-name',
      url: 'http://localhost:9999',
      serviceAccountToken: 'TOKEN',
      authProvider: 'serviceAccount',
    });

    const result2 = sut.getCoreClientByClusterDetails({
      name: 'cluster-name',
      url: 'http://localhost:9999',
      serviceAccountToken: 'TOKEN',
      authProvider: 'serviceAccount',
    });

    expect(result1.basePath).toBe('http://localhost:9999');
    // These fields aren't on the type but are there
    const auth1 = (result1 as any).authentications.default;
    expect(auth1.users[0].token).toBe('TOKEN');
    expect(auth1.clusters[0].name).toBe('cluster-name');

    expect(result2.basePath).toBe('http://localhost:9999');
    // These fields aren't on the type but are there
    const auth2 = (result2 as any).authentications.default;
    expect(auth2.users[0].token).toBe('TOKEN');
    expect(auth2.clusters[0].name).toBe('cluster-name');

    expect(mockGetKubeConfig.mock.calls.length).toBe(1);
  });

  it('can get apps client by cluster details', async () => {
    const sut = new KubernetesClientProvider();

    const mockGetKubeConfig = jest.fn(sut.getKubeConfig.bind({}));

    sut.getKubeConfig = mockGetKubeConfig;

    const result = sut.getAppsClientByClusterDetails({
      name: 'cluster-name',
      url: 'http://localhost:9999',
      serviceAccountToken: 'TOKEN',
      authProvider: 'serviceAccount',
    });

    expect(result.basePath).toBe('http://localhost:9999');
    // These fields aren't on the type but are there
    const auth = (result as any).authentications.default;
    expect(auth.users[0].token).toBe('TOKEN');
    expect(auth.clusters[0].name).toBe('cluster-name');

    expect(mockGetKubeConfig.mock.calls.length).toBe(1);
  });

  it('can get cached apps client by cluster details', async () => {
    const sut = new KubernetesClientProvider();

    const mockGetKubeConfig = jest.fn(sut.getKubeConfig.bind({}));

    sut.getKubeConfig = mockGetKubeConfig;

    const result1 = sut.getAppsClientByClusterDetails({
      name: 'cluster-name',
      url: 'http://localhost:9999',
      serviceAccountToken: 'TOKEN',
      authProvider: 'serviceAccount',
    });

    const result2 = sut.getAppsClientByClusterDetails({
      name: 'cluster-name',
      url: 'http://localhost:9999',
      serviceAccountToken: 'TOKEN',
      authProvider: 'serviceAccount',
    });

    expect(result1.basePath).toBe('http://localhost:9999');
    // These fields aren't on the type but are there
    const auth1 = (result1 as any).authentications.default;
    expect(auth1.users[0].token).toBe('TOKEN');
    expect(auth1.clusters[0].name).toBe('cluster-name');

    expect(result2.basePath).toBe('http://localhost:9999');
    // These fields aren't on the type but are there
    const auth2 = (result2 as any).authentications.default;
    expect(auth2.users[0].token).toBe('TOKEN');
    expect(auth2.clusters[0].name).toBe('cluster-name');

    expect(mockGetKubeConfig.mock.calls.length).toBe(1);
  });
});
