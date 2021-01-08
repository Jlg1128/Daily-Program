
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
classComponentUpdater -> enqueueSetState -> scheduleUpdateOnFiber -> performSyncWorkOnRoot（在这里循环工作，循环结束了提交） -> renderRootSync ->
workLoopSync -> performUnitOfWork -> beginWork$1 -> beginWork -> updateClassComponent ->  
1.如果实例存在，
2.如果实例不存在， -> constructClassInstance,mountClassInstance -> 
```