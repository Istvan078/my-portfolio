class Project {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.createdAt = data.createdAt;
    this.modifiedAt = data.modifiedAt;
    this.logo = data.logo;
    this.icons = data.icons;
    this.description = data.description;
    this.technologies = data.technologies;
    this.btnTexts = data.btnTexts;
    this.githubLink = data.githubLink;
    this.timeString = data?.timeString;
  }
}

export default Project;
