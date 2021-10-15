import React, { useEffect, useState, Suspense, useContext } from 'react';
import styled from 'styled-components/macro';
import { useSpring, animated } from 'react-spring';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useProgress } from '@react-three/drei';
import { useHistory } from 'react-router-dom';
//import { useControls } from 'leva';

import { viewport, css } from '../../../common/config';
import { MediaContext } from '../../../common/contexts';
import Button, { Wrapper as _Button } from '../../../components/Button';
import Loading, { Wrapper as _Loading } from '../../../common/svg/Loading';
import XX99Mk2 from './XX99Mk2';

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 75rem;
  height: 500rem;

  background: black;
  cursor: grab;

  &:active { cursor: grabbing }

  @media screen and (min-width: ${viewport.sm}) {
    height: 550rem;
  }
`;

const TextContainer = styled(animated.div)(({ $drag }: { $drag: boolean }) => `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  color: white;
  text-align: center;
  user-select: ${$drag ? "none" : "text"};
  cursor: ${$drag ? "grabbing" : "auto"};

  #title { margin: 5rem 0 }

  ${_Button} {
    margin: 30rem 0;
  }

  @media screen and (min-width: ${viewport.lg}) {
    left: ${css.window.horizontalPadding.lg};
    transform: translate(0, -50%);
    width: 37%;
    text-align: left;
  }
`);

const LoadingContainer = styled.div(({ $loaded }: { $loaded: boolean }) => `
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  background: black;
  display: ${$loaded ? "none" : "flex"};
  align-items: center;
  justify-content: center;

  ${_Loading} {
    height: 80rem;
  }
`);

const StarContainer = () => {
  /**
   * Hooks
   */
  const history = useHistory();
  const media = useContext(MediaContext);
  const [drag, setDrag] = useState(false);

  const { progress } = useProgress();

  const [textSpring, textAPI] = useSpring(() => ({ opacity: 1 }));

  //Leva
  // const { camera1, camera2 } = useControls({
  //   camera1: { x: 1, y: -1, z: 1 },
  //   camera2: { x: -1, y: 1, z: -1 }
  // });

  useEffect(() => {
    const fn = () => setDrag(false);

    window.addEventListener("mouseup", fn);
    window.addEventListener("pointerup", fn);

    return () => {
      window.removeEventListener("mouseup", fn);
      window.removeEventListener("pointerup", fn);
    }
  }, []);

  useEffect(() => {
    textAPI.start({ opacity: drag && !media.lg ? 0 : 1 });
  }, [drag, media, textAPI]);

  /**
   * Render
   */
  return (
    <Wrapper
      onMouseDown={() => setDrag(true)}
      onPointerDown={() => setDrag(true)}
    >
      <Canvas style={{ width: media.lg ? "140%" : "100%" }}>
        <ambientLight intensity={1} />
        <directionalLight intensity={1} position={[1, -1, 1]} castShadow />
        <directionalLight intensity={1} position={[-1, 1, -1]} castShadow />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          autoRotate={true}
        />

        <Suspense fallback={null}>
          <XX99Mk2 media={media} />
        </Suspense>
      </Canvas>

      <TextContainer
        onMouseDown={e => e.stopPropagation()}
        onPointerDown={e => e.stopPropagation()}
        style={textSpring}
        $drag={drag}
      >
        <p className="overline">NEW PRODUCT</p>
        <h1 id="title">XX99 MARK II HEADPHONES</h1>

        <p id="description" className="light">
          Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
        </p>

        <Button
          text="SEE PRODUCT"
          theme="primary"
          onClick={() => history.push('/headphones/xx99-mk2')}
        />
      </TextContainer>

      <LoadingContainer $loaded={progress === 100}>
        <Loading />
      </LoadingContainer>
    </Wrapper>
  );

}

export default StarContainer;