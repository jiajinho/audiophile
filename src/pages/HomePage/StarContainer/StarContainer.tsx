import React, { useEffect, useState, Suspense } from 'react';
import styled from 'styled-components/macro';
import { useSpring, animated } from 'react-spring';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useHistory } from 'react-router-dom';
//import { useControls } from 'leva';

import XX99Mk2 from './XX99Mk2';
import Button, { Wrapper as _Button } from '../../../components/Button';

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 75rem;
  height: 550rem;

  background: black;
  cursor: grab;

  &:active { cursor: grabbing }
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
`);

const StarContainer = () => {
  const history = useHistory();
  const [drag, setDrag] = useState(false);

  const [spring, api] = useSpring(() => ({
    opacity: 1
  }));

  // const { camera1, camera2 } = useControls({
  //   camera1: { x: 1, y: -1, z: 1 },
  //   camera2: { x: -1, y: 1, z: -1 }
  // });

  useEffect(() => {
    const fn = () => setDrag(false);

    window.addEventListener("mouseup", fn);
    return () => window.removeEventListener("mouseup", fn);
  }, []);

  useEffect(() => {
    api.start({ opacity: drag ? 0 : 1 });
  }, [drag]);


  return (
    <Wrapper onMouseDown={() => setDrag(true)}>
      <Canvas>
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
          <XX99Mk2 />
        </Suspense>
      </Canvas>


      <TextContainer
        onMouseDown={e => e.stopPropagation()}
        style={spring}
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
    </Wrapper>
  );

}

export default StarContainer;