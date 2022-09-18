
## class组件setState路线
* 事件代理以后查看
* class组件实例在渲染阶段（具体在adoptClassInstance函数），注入了updater
  调用updater的enqueueSetState的方法
* 获取当前组件，执行**createUpdate**方法生成fiber以及对应的update链表，
  再执行**enqueueUpdate**将生成的update链表接到fiber.updateQueue上
* 调用**scheduleUpdateOnFiber**开始更新


## 三个阶段
#### render
#### precommit
#### commit


### 调用路线
```javascript
classComponentUpdater -> enqueueSetState -> scheduleUpdateOnFiber -> performSyncWorkOnRoot（在这里循环工作，循环结束了提交 -> commitRoot） -> renderRootSync (在这个阶段 executionContext |= RenderContext) ->
workLoopSync -> performUnitOfWork -> beginWork$1 -> beginWork -> updateClassComponent ->  
1.如果实例存在，
2.如果实例不存在， -> constructClassInstance,mountClassInstance -> 
```
```javascript
提交： commitRoot -> commitRootImpl -> onCommitRoot -> injectedHook.onCommitFiberRoot
commitRootImpl 阶段
1.flushPassiveEffects -> flushPassiveEffectsImpl
2.commitBeforeMutationEffects 
* Snapshot ? commitBeforeMutationLifeCycles -> getSnapshotBeforeUpdate
```

```javascript

3.commitMutationEffects
* commitDeletion -> 
// 卸载的副作用的加入时机 
 pendingPassiveHookEffectsUnmount
 在commitDeletion阶段会将标记为Deletion的节点删除
 包括将useEffect中的的return函数加入到pendingPassiveHookEffectsUnmount中，
 commitDeletion -> unmountHostComponents -> commitUnmount -> enqueuePendingPassiveHookEffectUnmount -> pendingPassiveHookEffectsUnmount.push(effect, fiber) -> 
4.commitLayoutEffects
* commitLifeCycles -> schedulePassiveEffects -> 
// 执行hookeffects mount，也就是creat函数
commitHookEffectListMount -> 
schedulePassiveEffects -> enqueuePendingPassiveHookEffectMount -> flushPassiveEffects 1.清空卸载的副作用 2.生成新的卸载副作用 -> flushSyncCallbackQueue
```

## 比如说setState或者functionComponent的useState路线
### 如果已经处于RenderContext或者CommitContext阶段会将工作放到syncQueue中
### 路线 
```javascript
ensureRootIsScheduled -> scheduleSyncCallback（如果之前没任务了会立即执行，
如果有的话生成performSyncWorkOnRoot组成的syncQueue，之后通过flushSyncCallbackQueue清空）
```


<!-- overrideHookState -->


## 注意点
```javascript
    // props不相同或者context改变或者组件类型不相同都会刷新渲染
    if (oldProps !== newProps || hasContextChanged() || ( // Force a re-render if the implementation changed due to hot reload:
     workInProgress.type !== current.type )) {
      // If props or context changed, mark the fiber as having performed work.
      // This may be unset if the props are determined to be equal later (memo).
      didReceiveUpdate = true;
    }
```

## functionComponent更新过程
```javascript
beginWork -> updateFunctionComponent -> renderWithHooks ->
mount路线
useState -> mountState ->  dispatchAction -> scheduleUpdateOnFiber 
update路线
useState -> updateState -> updateReducer(basicStateReducer) -> hook.memoizedState = newState
```


## useEffect执行路线
```javascript
 mountEffect-> mountEffectImpl -> (加入副作用，将flag置为Update | Passive，判断deps是否每个元素都一样 ) hook.memoizedState = effects -> 
useEffect updateEffect-> updateEffectImpl -> 
```

## 关于schedule 

```javascript
//感觉schedule是为了处理在render阶段或者是非批量更新？？之外加入进来的更新
scheduleUpdateOnFiber -> ensureRootIsScheduled -> 
scheduleSyncCallback(scheduleCallback) -> Scheduler_scheduleCallback
```



疑问点：
```javascript
    immediateQueueCallbackNode = Scheduler_scheduleCallback(Scheduler_ImmediatePriority, flushSyncCallbackQueueImpl);
```
1.immediateQueueCallbackNode的作用


# React注册事件
1.handleEventsForInputEventPolyfill


ReactDOMRoot

## React注册事件
registerSimpleEvents();
registerEvents$2();
registerEvents$1();
registerEvents$3();
registerEvents();

# React事件类型
DiscreteEvent 离散事件. 例如blur、focus、 click、 submit、 touchStart. 这些事件都是离散触发的。
UserBlockingEvent 用户阻塞事件. 例如touchMove、mouseMove、scroll、drag、dragOver等等。这些事件会'阻塞'用户的交互。
ContinuousEvent 连续事件。例如load、error、loadStart、abort、animationEnd. 这个优先级最高，也就是说它们应该是立即同步执行的，这就是Continuous的意义，是持续地执行，不能被打断。
# 事件派发
1. dispatchDiscreteEvent
2. dispatchUserBlockingUpdate
3. dispatchEvent

eventSystemFlags
createRootImpl

dispatchDiscreteEvent -> 
1.flushDiscreteUpdatesIfNeeded -> flushDiscreteUpdatesImpl -> flushDiscreteUpdates -> 1.flushSyncCallbackQueue 2.flushPassiveEffects
2.discreteUpdates