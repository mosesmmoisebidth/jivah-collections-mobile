import { Text, TextProps } from "react-native";

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'SpaceMono' }]} />;
}
export function OutfitText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'OutfitMain' }]} />;
}
export function PoppinsText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'PoppinsMain' }]} />;
}
export function OutfitSemibold(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'OutfitSemibold' }]} />;
}
export function OutfitBold(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'OutfitBold' }]} />;
}