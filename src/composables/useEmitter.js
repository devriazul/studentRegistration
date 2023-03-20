import mitt from "mitt";
export function useEmitter() {
    const emitter = mitt();
    return emitter;
}