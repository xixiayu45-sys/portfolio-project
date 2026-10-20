/* ========== 1. 通用工具函数 ========== */
function createTextElement(tagName, text, className) {
    const element = document.createElement(tagName)
    element.textContent = text

    if (className !== "") {
        element.classList.add(className)
    }
    return element
}

/* ========== 2. 关于我模块 ========== */
const meg = document.querySelector("#meg")
const button = document.querySelector("#bt")
let expandedGoal = false

button.addEventListener("click", function () {
    expandedGoal = !expandedGoal
    if (expandedGoal) {
        meg.textContent = "当前学习重点是 JavaScript 基础能力、响应式页面开发、Vue 3 组件化思想和前后端接口交互，希望通过持续项目实践提升独立开发能力。"
        button.textContent = "收起学习目标"
    } else {
        meg.textContent = "我是一名计算机科学与技术专业学生，当前专注于前端开发方向，熟悉 HTML、CSS、JavaScript 基础，能够独立完成静态页面搭建、基础交互开发和项目上线部署。"
        button.textContent = "查看学习目标"
    }
})

/* ========== 3. 重点模式模块 ========== */
const pageShell = document.querySelector(".page-shell")
const qbt = document.querySelector("#qbt")

qbt.addEventListener("click", function () {
    pageShell.classList.toggle("xcard")
})

/* ========== 4. 留言表单模块 ========== */
const nameip = document.querySelector("#nameip")
const messip = document.querySelector("#messip")
const th = document.querySelector("#th")
const dan = document.querySelector("#dan")

dan.addEventListener("submit", function (event) {
    event.preventDefault()
    const nameValue = nameip.value.trim()
    const messageValue = messip.value.trim()

    if (nameValue === "" || messageValue === "") {
        th.textContent = "请填写姓名和留言内容"
        th.classList.add("sp")
        th.classList.remove("cg")
        return
    }

    th.textContent = `已收到 ${nameValue} 的留言，感谢反馈。`
    th.classList.add("cg")
    th.classList.remove("sp")
    nameip.value = ""
    messip.value = ""
})

/* ========== 5. 技能模块：数据、存储、渲染、事件 ========== */
const defaultSkills = ["HTML5", "CSS3", "JavaScript", "DOM", "localStorage", "Flex", "CSS Grid", "Git"]
const savedSkills = localStorage.getItem("portfolioSkills")
let skills = defaultSkills.slice()

try {
    if (savedSkills !== null) {
        const parseSkill = JSON.parse(savedSkills)
        if (Array.isArray(parseSkill)) {
            skills = parseSkill
        } else {
            localStorage.removeItem("portfolioSkills")
        }
    }
} catch {
    localStorage.removeItem("portfolioSkills")
}

const addSkill = document.querySelector("#addSkill")
const newSkill = document.querySelector("#newSkill")
const skillTip = document.querySelector("#textTip")
const resetSkill = document.querySelector("#resetSkill")

function saveSkill() {
    localStorage.setItem("portfolioSkills", JSON.stringify(skills))
}

function renderSkills() {
    const skillList = document.querySelector("#pa ul")
    skillList.textContent = ""

    skills.forEach(function (skill) {
        const item = createTextElement("li", skill, "")
        const deleteButton = createTextElement("button", "删除", "")
        deleteButton.type = "button"

        deleteButton.addEventListener("click", function () {
            skills = skills.filter(function (currentSkill) {
                return currentSkill !== skill
            })
            saveSkill()
            renderSkills()
            skillTip.textContent = `已删除 ${skill}`
        })

        item.appendChild(deleteButton)
        skillList.appendChild(item)
    })
}

addSkill.addEventListener("submit", function (event) {
    event.preventDefault()
    const skillName = newSkill.value.trim()

    if (skillName === "") {
        skillTip.textContent = "请输入需要添加的技能"
        return
    }
    if (skills.includes(skillName)) {
        skillTip.textContent = "当前技能已添加"
        return
    }

    skills.push(skillName)
    saveSkill()
    renderSkills()
    skillTip.textContent = `已添加 ${skillName}`
    newSkill.value = ""
})

resetSkill.addEventListener("click", function () {
    localStorage.removeItem("portfolioSkills")
    skills = defaultSkills.slice()
    renderSkills()
    skillTip.textContent = "已恢复默认技能"
})

renderSkills()

/* ========== 6. 项目模块：数据和 DOM ========== */
const defaultProjects = [
    {
        id: "portfolio-page",
        title: "个人前端求职主页",
        desc: "使用语义化 HTML、CSS 和原生 JavaScript 搭建个人求职展示页面，包含个人介绍、技能展示、项目经历和联系方式。",
        techs: ["HTML5", "CSS3", "JavaScript"],
        repoUrl: "https://github.com/xixiayu45-sys/portfolio-project"
    },
    {
        id: "vue-portfolio",
        title: "Vue 个人作品集",
        desc: "基于 Vue 3、Vite、Express 和 MySQL 构建个人作品集，使用响应式布局展示个人资料与项目，并通过接口实现项目数据的加载、新增、编辑和删除。",
        techs: ["Vue 3", "Vite", "JavaScript", "Express", "MySQL"],
        repoUrl: "https://github.com/xixiayu45-sys/vue-portfolio-project"
    },
    {
        id: "ticketrush",
        title: "TicketRush 票务活动管理后端",
        desc: "基于 Spring Boot、MyBatis-Plus 和 MySQL 构建票务活动管理接口，提供活动增删改查、分页查询、库存与时间校验、统一响应和全局异常处理，并持续扩展用户注册与密码加密能力。",
        techs: ["Java", "Spring Boot", "MyBatis-Plus", "MySQL", "REST API"],
        repoUrl: "https://github.com/xixiayu45-sys/TicketRush"
    }
]
const savedProjects = localStorage.getItem("portfolioProjects")
let projects = defaultProjects.slice()
const PROJECT_DATA_VERSION = "4"
const PROJECT_DATA_VERSION_KEY = "portfolioProjectDataVersion"

const techFilter = document.querySelector("#techFilter")
const addProject = document.querySelector("#addProject")
const cleanButton = document.querySelector("#cleanButton")
const editProjectButton = document.querySelector("#editProjectButton")
const projectTitle = document.querySelector("#projectTitle")
const projectDesc = document.querySelector("#projectDesc")
const projectTechs = document.querySelector("#projectTechs")
const editDesc = document.querySelector("#editDesc")
let editingProjectID = ""

try {
    if (savedProjects !== null) {
        const parseProject = JSON.parse(savedProjects)
        if (Array.isArray(parseProject)) {
            projects = parseProject.map(function (project, index) {
                if (project.id === undefined) {
                    project.id = "saved-project-" + index + "-" + Date.now().toString()
                }
                return project
            })
            saveProjects()
        } else {
            localStorage.removeItem("portfolioProjects")
        }
    }
} catch {
    localStorage.removeItem("portfolioProjects")
}

function migrateStoredProjects() {
    const storedVersion = Number(localStorage.getItem(PROJECT_DATA_VERSION_KEY) || "0")
    if (storedVersion >= Number(PROJECT_DATA_VERSION)) {
        return false
    }

    const savedDefaults = new Map()
    const customProjects = []
    const defaultProjectIds = new Set(defaultProjects.map(function (project) {
        return project.id
    }))
    const legacyDefaultProjectIds = new Set(["skill-project-manager", "project-filter-form"])

    projects.forEach(function (project) {
        if (defaultProjectIds.has(project.id)) {
            savedDefaults.set(project.id, project)
            return
        }
        if (legacyDefaultProjectIds.has(project.id)) {
            return
        }
        customProjects.push(project)
    })

    projects = defaultProjects.map(function (project) {
        const savedProject = savedDefaults.get(project.id)
        if (savedProject !== undefined) {
            return savedProject
        }
        return {
            ...project,
            techs: project.techs.slice()
        }
    }).concat(customProjects)

    projects.forEach(function (project) {
        if (project.repoUrl !== undefined && project.repoUrl !== "") {
            return
        }

        const defaultProject = defaultProjects.find(function (defaultItem) {
            return defaultItem.id === project.id
        })
        if (defaultProject !== undefined && defaultProject.repoUrl !== undefined) {
            project.repoUrl = defaultProject.repoUrl
        }
    })

    localStorage.setItem(PROJECT_DATA_VERSION_KEY, PROJECT_DATA_VERSION)
    return true
}

if (migrateStoredProjects()) {
    saveProjects()
}

/* ========== 7. 项目模块：存储和渲染 ========== */
function saveProjects() {
    localStorage.setItem("portfolioProjects", JSON.stringify(projects))
}

function renderProjects(projectList) {
    const projectSection = document.querySelector("#xm")
    const oldProjects = projectSection.querySelectorAll("article")
    const projectCount = document.querySelector("#projectCount")

    oldProjects.forEach(function (article) {
        article.remove()
    })

    projectList.forEach(function (project) {
        const article = document.createElement("article")
        const title = createTextElement("h3", project.title, "project-title")
        const desc = createTextElement("p", project.desc, "project-desc")
        const tagList = createTextElement("ul", "", "tagList")
        const skillNum = createTextElement("p", `使用技术数量：${project.techs.length}`, "project-meta")
        const techsText = project.techs.join("、")
        const textStr = createTextElement("p", `技术栈：${techsText}`, "project-techs-text")
        const projectLinks = document.createElement("div")
        projectLinks.classList.add("project-links")

        const actions = document.createElement("div")
        actions.classList.add("project-actions")
        const editButton = createTextElement("button", "编辑项目", "")
        editButton.type = "button"
        editButton.classList.add("secondary-button")
        const deleteButton = createTextElement("button", "删除项目", "")
        deleteButton.type = "button"
        deleteButton.classList.add("danger-button")

        actions.appendChild(editButton)
        actions.appendChild(deleteButton)

        article.appendChild(title)
        article.appendChild(desc)
        article.appendChild(skillNum)
        article.appendChild(textStr)

        if (project.repoUrl !== undefined && project.repoUrl !== "") {
            const repoLink = createTextElement("a", "查看 GitHub 仓库", "project-link")
            repoLink.href = project.repoUrl
            repoLink.target = "_blank"
            repoLink.rel = "noopener noreferrer"
            repoLink.setAttribute("aria-label", `在新窗口打开 ${project.title} 的 GitHub 仓库`)
            projectLinks.appendChild(repoLink)
            article.appendChild(projectLinks)
        }

        article.appendChild(actions)

        editButton.addEventListener("click", function () {
            editProjectButton.textContent = "保存编辑"
            startEditProject(project.id)
        })

        deleteButton.addEventListener("click", function () {
            deleteProject(project.id)
        })

        project.techs.forEach(function (tech) {
            const tag = createTextElement("li", tech, "project-tag")
            tagList.appendChild(tag)
        })

        article.appendChild(tagList)
        projectSection.appendChild(article)
    })

    projectCount.textContent = `当前显示 ${projectList.length} 个项目`
}

function renderTechFilterOptions() {
    techFilter.textContent = ""
    const allOption = document.createElement("option")
    allOption.value = "all"
    allOption.textContent = "全部项目"
    techFilter.appendChild(allOption)

    const techSet = new Set()
    projects.forEach(function (project) {
        project.techs.forEach(function (tech) {
            techSet.add(tech)
        })
    })

    techSet.forEach(function (tech) {
        const option = document.createElement("option")
        option.value = tech
        option.textContent = tech
        techFilter.appendChild(option)
    })
}

/* ========== 8. 项目模块：筛选、新增、编辑、删除 ========== */
techFilter.addEventListener("change", function () {
    const selectedTech = techFilter.value

    if (selectedTech === "all") {
        renderProjects(projects)
        return
    }

    const filteredProjects = projects.filter(function (project) {
        return project.techs.includes(selectedTech)
    })
    renderProjects(filteredProjects)
})

function startEditProject(projectId) {
    const targetProject = projects.find(function (project) {
        return project.id === projectId
    })
    if (targetProject === undefined) {
        return
    }
    editDesc.textContent = `正在编辑：${targetProject.title}`
    editingProjectID = targetProject.id
    projectTitle.value = targetProject.title
    projectDesc.value = targetProject.desc
    projectTechs.value = targetProject.techs.join(",")
}

addProject.addEventListener("submit", function (event) {
    event.preventDefault()
    const title = projectTitle.value.trim()
    const desc = projectDesc.value.trim()
    const techs = projectTechs.value.trim()
    const techsArray = techs.split(",")
        .map(function (tech) {
            return tech.trim()
        })
        .filter(function (tech) {
            return tech !== ""
        })

    if (!isProjectFormValid(title, desc, techsArray)) {
        editDesc.textContent = "请完整填写项目名称、项目描述和技术栈"
        return
    }

    if (editingProjectID === "") {
        const newProject = {
            id: Date.now().toString(),
            title: title,
            desc: desc,
            techs: techsArray
        }
        projects.push(newProject)
        refreshProjects()
        editDesc.textContent = "添加项目成功"
        cleanProjectForm()
        return
    }

    const targetProject = projects.find(function (project) {
        return project.id === editingProjectID
    })
    if (targetProject === undefined) {
        editDesc.textContent = "未找到正在编辑的项目"
        return
    }

    targetProject.title = title
    targetProject.desc = desc
    targetProject.techs = techsArray
    resetEditState()
    refreshProjects()
    editDesc.textContent = "项目编辑成功"
    cleanProjectForm()
})

cleanButton.addEventListener("click", function () {
    resetEditState()
    cleanProjectForm()
    editDesc.textContent = "已清空表单"
})

function deleteProject(projectId) {
    const isOk = confirm("确定需要删除该项目吗？")

    if (!isOk) {
        return
    }

    projects = projects.filter(function (project) {
        return project.id !== projectId
    })
    refreshProjects()
    editDesc.textContent = "项目已删除"
}

/* ========== 9. 项目模块：表单辅助函数和初始化 ========== */
function cleanProjectForm() {
    projectTitle.value = ""
    projectDesc.value = ""
    projectTechs.value = ""
}

function resetEditState() {
    editingProjectID = ""
    editProjectButton.textContent = "添加项目"
}

function isProjectFormValid(title, desc, techsArray) {
    return title !== "" && desc !== "" && techsArray.length > 0
}

function refreshProjects() {
    saveProjects()
    renderTechFilterOptions()
    renderProjects(projects)
}

renderTechFilterOptions()
renderProjects(projects)
