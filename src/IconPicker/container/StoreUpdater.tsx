import type { FC } from 'react';

import { createStoreUpdater } from '../../utils';
import type { State } from '../store';
import { useStoreApi } from '../store';
import type { ExternalScripts, IconUnit } from '../types';

export interface StoreUpdaterProps
  extends Partial<
    Pick<
      State,
      | 'icon'
      | 'onIconChange'
      | 'iconfontScripts'
      | 'onIconfontScriptsChange'
      | 'activeIconfontScript'
      | 'onActiveIconfontScriptChange'
    >
  > {
  defaultIcon?: IconUnit;
  defaultIconfontScripts?: ExternalScripts[];
  defaultActiveIconfontScript?: string;
}

const StoreUpdater: FC<StoreUpdaterProps> = ({
  icon,
  defaultIcon,
  iconfontScripts,
  defaultIconfontScripts,
  onIconChange,
  onIconfontScriptsChange,

  activeIconfontScript,
  defaultActiveIconfontScript,
  onActiveIconfontScriptChange,
}) => {
  const storeApi = useStoreApi();
  const useStoreUpdater = createStoreUpdater<StoreUpdaterProps>(useStoreApi);

  useStoreUpdater('icon', defaultIcon, []);
  useStoreUpdater('icon', icon);
  useStoreUpdater('onIconChange', onIconChange);

  useStoreUpdater(
    'iconfontScripts',
    iconfontScripts,
    [iconfontScripts],
    (state) => {
      storeApi.setState({
        iconfontScripts: state,
        outsourceIconfontScripts: state,
      });
    },
  );
  useStoreUpdater('iconfontScripts', defaultIconfontScripts, []);
  useStoreUpdater('onIconfontScriptsChange', onIconfontScriptsChange);

  useStoreUpdater(
    'activeIconfontScript',
    activeIconfontScript,
    [activeIconfontScript],
    (script) => {
      storeApi.getState().selectScript(script);
    },
  );
  useStoreUpdater(
    'activeIconfontScript',
    defaultActiveIconfontScript,
    [],
    (script) => {
      storeApi.getState().selectScript(script);
    },
  );
  useStoreUpdater('onActiveIconfontScriptChange', onActiveIconfontScriptChange);

  return null;
};
export default StoreUpdater;