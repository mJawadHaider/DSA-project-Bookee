class Graph {
	constructor() {
		this.AdjList = new Map();
		this.admin = {
			firstName: 'Danish',
			lastName: 'Akram',
			email: 'admin@gmail.com',
			role: 'admin',
			password: 'sajjad734',
		};
		const reader = {
			firstName: 'Jawad',
			lastName: 'Haider',
			email: 'reader@gmail.com',
			role: 'reader',
			password: 'sajjad734',
		};
		this.addNewUser(this.admin);
		this.addNewUser(reader);
	}

	addNewUser(newUser) {
		this.AdjList.set(newUser.email, {
			user: newUser,
			friends: [],
		});
	}

	addFriends(currentUser, friend) {
		const { user, friends } = this.AdjList.get(currentUser.email);
		if (friends.find((f) => f.id === friend.id)) {
			return false;
		}
		friends.push(friend);
		return true;
	}

	removeFriend(currentUser, friend) {
		let { user, friends } = this.AdjList.get(currentUser.email);
		friends = friends.filter((f) => f.id !== friend.userId);
		this.AdjList.set(user.email, {
			user,
			friends,
		});
		console.log(friends, 'friends');
		console.log('adjList', this.AdjList);
	}

	findUserByEmail(email) {
		const isUserFound = this.AdjList.get(email);
		return isUserFound.user;
	}

	userLogin(user) {
		const isUserFound = this.AdjList.get(user.email);
		if (isUserFound && isUserFound.user.password === user.password) {
			return isUserFound.user;
		}
		return false;
	}

	isUser(user) {
		return this.AdjList.has(user.email);
	}

	printGraph() {
		this.AdjList.forEach((obj) => {
			const user = obj.user;
			let str = '';
			str += user.firstName + ' -> ';
			const friends = obj.friends;
			friends.forEach((neighbour) => {
				str = str + neighbour.firstName + ' ';
			});
			console.log(str);
		});
	}

	bfs(startingNode) {
		let visited = {};
		let queue = [];
		if (!startingNode) {
			startingNode = this.admin;
		}
		queue.push(startingNode);
		visited[startingNode] = true;

		while (queue.length) {
			const currentUser = queue.shift();
			console.log(currentUser.firstName);

			const { user, friends } = this.AdjList.get(currentUser.email);
			for (const neighbour in friends) {
				// const neighbour = friends[friends];
				if (!visited[neighbour]) {
					visited[neighbour] = true;
					queue.push(neighbour);
				}
			}
		}
	}

	dfs(startingNode) {
		let visited = {};
		let stack = [];
		stack.push(startingNode);
		visited[startingNode] = true;

		while (stack.length) {
			let user = stack.pop();
			console.log(user.firstName);

			const friendsList = this.AdjList.get(user);
			for (let friend in friendsList) {
				if (!visited[friend]) {
					stack.push(friend);
					visited[friend] = true;
				}
			}
		}
	}
}

export default new Graph();
