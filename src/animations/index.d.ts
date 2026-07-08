import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DependencyList, MutableRefObject } from 'react';

export function useGsapAnimation(
  animationCallback: (self: gsap.Context) => void,
  dependencies?: DependencyList,
  scopeRef?: MutableRefObject<any> | null
): MutableRefObject<gsap.Context | null>;

export function animateFadeUp(
  target: gsap.TweenTarget,
  options?: gsap.TweenVars
): gsap.core.Tween;

export function animateStaggerFade(
  targets: gsap.TweenTarget,
  options?: gsap.TweenVars
): gsap.core.Tween;

export { gsap, ScrollTrigger };
