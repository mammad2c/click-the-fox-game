export interface CountdownProps {
  duration: number;
  canStart?: boolean;
  onFinish?: () => void;
}
