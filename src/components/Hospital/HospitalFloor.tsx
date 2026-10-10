export default function HospitalFloor() {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.24, 0]}
      receiveShadow
    >
      <planeGeometry args={[18, 15]} />
      <meshStandardMaterial color="#f8fbff" />
    </mesh>
  );
}
