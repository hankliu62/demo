package main

import (
	"fmt"
	"time"
)

// 使用Go协程和通道来实现一个工作池(worker)

// 在多个并发实例中支持的任务，每个执行者(worker)都从jobs中获得任务，通过results发送任务的结果
// 使用time.Sleep来模拟每个任务的执行时间为1s
// 为了是每个工作池都能接收和发送执行的结果，我们需要两个通道（jobs和results）
func worker(id int, jobs <-chan int, results chan<- int) {
	for j := range jobs {
		fmt.Println("worker", id, "processing job", j)
		time.Sleep(time.Second)
		results <- j * 2
	}

	fmt.Println("Jobs are over, for worker: ", id)
}

func main() {
	jobs := make(chan int, 100)
	results := make(chan int, 100)

	// 启动3个worker，初始时是阻塞的，还没有传递任务
	for w := 1; w <= 3; w++ {
		go worker(w, jobs, results)
	}

	// 给workers发送了9个job, 然后close这个jobs通道，告诉workers任务已经完成，不需要在阻塞等到job（worker中的for循环结束）
	for j := 1; j <= 9; j++ {
		jobs <- j
	}

	close(jobs)

	// 注： 为什么这里不能使用for + range的迭代结构
	// for result := range results {
	// 	fmt.Println("result: ", result)
	// }

	// 收集worker执行job的返回数据
	// 9个job被多个worker执行，因为3个worker是并行的，所以总执行时间是3s
	for i := 1; i <= 9; i++ {
		fmt.Println("result: ", <-results)
	}
	close(results)
}
