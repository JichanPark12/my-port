'use client';

import { useState } from 'react';
import Nav from './nav/Nav';
import { ScreenComponents } from '../types/type';
import Home from './screens/home/Home';
import Skills from './screens/skills/Skills';
import AboutMe from './screens/aboutMe/AboutMe';
import MyProjects from './screens/myProjects/MyProjects';

export interface TransitioningOut {
  exiting: boolean;
  to: ScreenComponents;
}
type ScreenComponentProps = {
  transitioningOut: TransitioningOut;
  onExitComplete: () => void;
};

const screenComponents: Record<
  ScreenComponents,
  React.FC<ScreenComponentProps>
> = {
  home: Home,
  skills: Skills,
  aboutMe: AboutMe,
  myProjects: MyProjects,
};
const ControllerContainer = () => {

  const [currentState, setCurrentState] = useState<ScreenComponents>('home');
  const [transitioningOut, setTransitioningOut] = useState<TransitioningOut>({
    exiting: false,
    to: currentState,
  });

  const CurrentComponent = screenComponents[currentState];
  return (
    <>
      <div className="max-w-screen-xl mx-auto">
        <Nav
          setTransitioningOut={setTransitioningOut}
          currentState={currentState}
        />
        <div className="pt-40 pb-4">
          <CurrentComponent
            transitioningOut={transitioningOut}
            onExitComplete={() => {
              setCurrentState(transitioningOut.to);
              setTransitioningOut({
                ...transitioningOut,
                exiting: false,
              });
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ControllerContainer;
