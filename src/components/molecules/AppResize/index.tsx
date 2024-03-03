import { useState } from 'react';
import { Panel, PanelGroup } from 'react-resizable-panels';
import ResizeHandle from './ResizeHandle';
import styles from './styles.module.css';
import * as ReactIs from 'react-is';
type AppResizeProp = {
  hiddenSecondChild: boolean;
  firstChild: React.ReactNode;
  secondChild: React.ReactNode | React.ReactFragment;
};
const AppResize = (prop: AppResizeProp) => {
  const { hiddenSecondChild, firstChild, secondChild } = prop;
  return (
    <div className={styles.Container}>
      <div className={styles.BottomRow}>
        <PanelGroup autoSaveId='example' direction='vertical'>
          <Panel
            className={styles.Panel}
            defaultSizePercentage={40}
            collapsible={true}
            order={1}
            minSizePixels={200}
            maxSizePixels={600}
          >
            {firstChild}
          </Panel>

          {!hiddenSecondChild &&
            ReactIs.typeOf(secondChild) !== ReactIs.Fragment && (
              <>
                <ResizeHandle />
                <Panel
                  className={styles.Panel}
                  collapsible={true}
                  order={2}
                  // minSizePixels={200}
                  // maxSizePixels={600}
                >
                  <div className={styles.PanelContent}>{secondChild}</div>
                </Panel>
              </>
            )}
        </PanelGroup>
      </div>
    </div>
  );
};

export default AppResize;
