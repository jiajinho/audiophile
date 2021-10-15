import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

const path = "/static/gltf/xx99mk2_v1.glb";

type GLTFResult = GLTF & {
  nodes: {
    Stud_ChatSound: THREE.Mesh
    Stud_21Off: THREE.Mesh
    Stud_Mute: THREE.Mesh
    Text_ChatSound: THREE.Mesh
    Text_21Off: THREE.Mesh
    Text_Mute: THREE.Mesh
    Plane014: THREE.Mesh
    Plane014_1: THREE.Mesh
    Plane014_2: THREE.Mesh
    Cylinder001: THREE.Mesh
    Cylinder002: THREE.Mesh
    Cylinder001_1: THREE.Mesh
    Cylinder001_2: THREE.Mesh
    Cylinder001_3: THREE.Mesh
    Cylinder001_4: THREE.Mesh
    Circle: THREE.Mesh
    Circle_1: THREE.Mesh
    Circle_2: THREE.Mesh
    Circle_3: THREE.Mesh
    Circle_4: THREE.Mesh
  }
  materials: {
    Shiny: THREE.MeshStandardMaterial
    WhiteInk: THREE.MeshStandardMaterial
    Dull: THREE.MeshStandardMaterial
    ['Dull Dark']: THREE.MeshStandardMaterial
    ['Darker Shiny']: THREE.MeshStandardMaterial
    Leather: THREE.MeshStandardMaterial
    Metal: THREE.MeshStandardMaterial
    Leather2: THREE.MeshStandardMaterial
  }
}

const XX99Mk2 = () => {
  const { nodes, materials } = useGLTF(path) as any as GLTFResult;
  const three = useThree();

  useEffect(() => {
    //Re-adjust the camera position of OrbitControl
    three.camera.position.set(0, 0, 10);
  }, [three]);

  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Stud_ChatSound.geometry}
        material={nodes.Stud_ChatSound.material}
        position={[2.43, -2.37, 2.28]}
        rotation={[Math.PI / 2, -0.46, 0]}
        scale={[0.05, 0.05, -0.43]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Stud_21Off.geometry}
        material={nodes.Stud_21Off.material}
        position={[1.63, -4, 2.14]}
        rotation={[Math.PI / 2, -0.46, 0]}
        scale={[0.05, 0.05, -0.36]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Stud_Mute.geometry}
        material={nodes.Stud_Mute.material}
        position={[1.72, -3.83, -1.55]}
        rotation={[-3.05, 0.01, 0.47]}
        scale={[0.04, 0.04, -0.32]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text_ChatSound.geometry}
        material={nodes.Text_ChatSound.material}
        position={[2.59, -2.24, 2.15]}
        rotation={[-1.68, -1.11, 3.05]}
        scale={[0.05, 0.05, 0.05]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text_21Off.geometry}
        material={nodes.Text_21Off.material}
        position={[1.96, -3.56, 1.64]}
        rotation={[-Math.PI / 2, -1.11, -Math.PI]}
        scale={[0.05, 0.05, 0.05]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text_Mute.geometry}
        material={nodes.Text_Mute.material}
        position={[1.84, -3.74, -1.28]}
        rotation={[-Math.PI / 2, -1.11, Math.PI / 2]}
        scale={[0.07, 0.07, 0.07]}
      />
      <group position={[0.39, 4.23, 0]} rotation={[0, 0, -Math.PI / 2]} scale={[0.09, 0.14, 0.61]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane014.geometry}
          material={nodes.Plane014.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane014_1.geometry}
          material={nodes.Plane014_1.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane014_2.geometry}
          material={materials['Dull Dark']}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder001.geometry}
        material={nodes.Cylinder001.material}
        position={[3.2, -2.75, 0]}
        rotation={[Math.PI / 2, -0.45, -Math.PI / 2]}
        scale={[0.29, 0.22, 0.29]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder002.geometry}
        material={nodes.Cylinder002.material}
        position={[-3.17, -2.75, 0]}
        rotation={[-Math.PI / 2, -0.45, -Math.PI / 2]}
        scale={[0.29, 0.22, 0.29]}
      />
      <group
        position={[-2.35, -2.38, 0.06]}
        rotation={[3.08, -0.01, 1.12]}
        scale={[1.96, 0.2, 1.96]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001_1.geometry}
          material={nodes.Cylinder001_1.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001_2.geometry}
          material={nodes.Cylinder001_2.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001_3.geometry}
          material={nodes.Cylinder001_3.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001_4.geometry}
          material={materials.Leather}
        />
      </group>
      <group position={[2.02, -3.2, 1.7]} rotation={[2.09, -0.4, 0.22]} scale={[0.04, 0.04, 0.04]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle.geometry}
          material={nodes.Circle.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle_1.geometry}
          material={nodes.Circle_1.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle_2.geometry}
          material={nodes.Circle_2.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle_3.geometry}
          material={materials.Metal}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle_4.geometry}
          material={materials.Leather2}
        />
      </group>
    </group>
  )
}

useGLTF.preload(path);


export default XX99Mk2;