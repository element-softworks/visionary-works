import { useCallback, useContext, useLayoutEffect, useState } from 'react';
// import { RootElementContext } from '@helpers/contexts';
// import useResizeObserver from '@react-hook/resize-observer';

interface DimensionObject {
	width: number;
	height: number;
	top: number;
	left: number;
	x: number;
	y: number;
	right: number;
	bottom: number;
	offsetTop: number;
	offsetLeft: number;
	offsetRight: number;
	offsetBottom: number;
	offsetWidth: number;
	offsetHeight: number;
	windowWidth: number;
	windowHeight: number;
}

type UseDimensionsHook = [
	(node: any) => void,
		{ [x: string]: any } | DimensionObject,
	HTMLElement,
	boolean
];

interface UseDimensionsArgs {
	liveMeasure?: boolean;
	flush?: boolean;
}

function getDimensionObject(node: HTMLElement): DimensionObject {
	const rect = node?.getBoundingClientRect?.();

	return {
		width: rect?.width ?? null,
		height: rect?.height ?? null,
		top: !!rect && 'x' in rect ? rect?.y : rect?.top ?? null,
		left: !!rect && 'y' in rect ? rect?.x : rect?.left ?? null,
		x: !!rect && 'x' in rect ? rect?.x : rect?.left ?? null,
		y: !!rect && 'y' in rect ? rect?.y : rect?.top ?? null,
		right: (!!rect && 'x' in rect ? rect?.x : rect?.left) + rect?.width ?? null,
		bottom: (!!rect && 'y' in rect ? rect?.y : rect?.top) + rect?.height ?? null,
		offsetLeft: node?.offsetLeft ?? null,
		offsetTop: node?.offsetTop ?? null,
		offsetRight: node?.offsetLeft + node?.offsetWidth ?? null,
		offsetBottom: node?.offsetTop + node?.offsetHeight ?? null,
		offsetWidth: node?.offsetWidth,
		offsetHeight: node?.offsetHeight,
		windowHeight: window.innerHeight,
		windowWidth: window.innerWidth
	};
}

function useDimensions({
	                       liveMeasure = true,
	                       flush = false
                       }: UseDimensionsArgs = {}): UseDimensionsHook {
	// const $root = useContext(RootElementContext);
	const [flushing, setFlushing] = useState(false);
	const [dimensions, setDimensions] = useState({});
	const [node, setNode] = useState<any>(null);

	const ref = useCallback(node => {
		setNode(node);
	}, []);

	const measure = () => {
		window.requestAnimationFrame(() => {
			if (flush) {
				setFlushing(true);
				setDimensions({});
				window.requestAnimationFrame(() => {
					setDimensions(getDimensionObject(node));
					setFlushing(false);
				});
			} else {
				setDimensions(getDimensionObject(node));
			}
		});
	};

	useLayoutEffect(() => {
		if (node) {
			measure();

			if (liveMeasure) {
				window.addEventListener('resize', measure);

				return () => {
					window.removeEventListener('resize', measure);
				};
			}
		}
	}, [node, flush]);

	// useResizeObserver($root, measure);

	return [ref, dimensions, node as any, flushing];
}

export default useDimensions;
