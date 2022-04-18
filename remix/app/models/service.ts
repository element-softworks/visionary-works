type Service = {
	slug: string;
	title: string;
};

export async function getServices(): Promise<Array<Service>> {
	return [
		{
			slug: "my-first-post",
			title: "My First Service",
		},
		{
			slug: "90s-mixtape",
			title: "A Mixtape I Made Just For You",
		},
	];
}
