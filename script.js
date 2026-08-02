/* ========== 1. 通用工具函数 ========== */
// 创建带文本和 class 的 DOM 元素，减少重复代码。
function createTextElement(tagName, text, className) {
    const element = document.createElement(tagName)
    element.textContent = text

    if (className !== "") {
        element.classList.add(className)
    }
    return element
}

/* ========== 2. 关于我模块 ========== */
// 点击按钮后切换个人简介里的学习目标。
const meg = document.querySelector("#meg")
const button = document.querySelector("#bt")
let ep = false

button.addEventListener("click", function () {
    ep = !ep
    if (ep) {
        meg.textContent = "我正在学习 HTML、CSS 和 JavaScript"
        button.textContent = "收起学习目标"
    } else {
        meg.textContent = "我正在学习 Web"
        button.textContent = "查看学习目标"
    }
})

/* ========== 3. 重点模式模块 ========== */
// 点击页脚按钮后切换主卡片的高亮样式。
const card = document.querySelector(".card")
const qbt = document.querySelector("#qbt")

qbt.addEventListener("click", function () {
    card.classList.toggle("xcard")
})

/* ========== 4. 留言表单模块 ========== */
// 提交时校验姓名和留言，并显示成功或错误反馈。
const nameip = document.querySelector("#nameip")
const messip = document.querySelector("#messip")
const th = document.querySelector("#th")
const dan = document.querySelector("#dan")

dan.addEventListener("submit", function (event) {
    event.preventDefault()
    const name1 = nameip.value.trim()
    const mess = messip.value.trim()

    if (name1 === "" || mess === "") {
        th.textContent = "请填写姓名和留言"
        th.classList.add("sp")
        th.classList.remove("cg")
    } else {
        th.textContent = `已收到 ${name1} 的留言`
        th.classList.add("cg")
        th.classList.remove("sp")
    }
})

/* ========== 5. 技能模块：数据、存储、渲染、事件 ========== */
// 技能数据：默认技能和浏览器本地保存的技能。
const defaultSkills = ["HTML", "CSS", "JavaScript", "Git"]
const savedSkills = localStorage.getItem("skills")
let skills = defaultSkills.slice()

try {
    if (savedSkills !== null) {
        const parseSkill = JSON.parse(savedSkills)
        if (Array.isArray(parseSkill)) {
            skills = parseSkill
        } else {
            localStorage.removeItem("skills")
        }
    }
} catch {
    localStorage.removeItem("skills")
}

// 技能 DOM：新增、重置和提示区域。
const addSkill = document.querySelector("#addSkill")
const newSkill = document.querySelector("#newSkill")
const skillTip = document.querySelector("#textTip")
const resetSkill = document.querySelector("#resetSkill")

// 保存技能列表到 localStorage。
function saveSkill() {
    localStorage.setItem("skills", JSON.stringify(skills))
}

// 渲染技能列表，并给每个技能添加删除按钮。
function renderSkills() {
    const skillList = document.querySelector("#pa ul")
    skillList.textContent = ""

    skills.forEach(function (skill) {
        const item = createTextElement("li", skill, "")
        const deleteButton = createTextElement("button", "删除", "")
        deleteButton.type = "button"

        deleteButton.addEventListener("click", function () {
            skills = skills.filter(function (deleteskill) {
                return deleteskill !== skill
            })
            saveSkill()
            renderSkills()
            skillTip.textContent = `已删除 ${skill}`
        })

        item.appendChild(deleteButton)
        skillList.appendChild(item)
    })
}

// 新增技能：校验空值和重复项，校验通过后更新列表。
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

// 重置技能：清除本地保存的技能，并恢复默认技能列表。
resetSkill.addEventListener("click", function () {
    localStorage.removeItem("skills")
    skills = defaultSkills.slice()
    renderSkills()
    skillTip.textContent = "已重置"
})

renderSkills()

/* ========== 6. 项目模块：数据和 DOM ========== */
// 项目数据：提供默认项目，并从 localStorage 读取用户新增项目。
const defaultProjects = [
    { id: "home-page", title: "个人主页", desc: "制作求职主页", techs: ["HTML", "JavaScript", "submit"] },
    { id: "text-from", title: "留言表单", desc: "处理表单提交和反馈", techs: ["HTML", "JavaScript", "submit"] },
    { id: "projects-filter", title: "项目筛选", desc: "按技术栈筛选项目卡片", techs: ["CSS", "Grid", "JavaScript"] }
]
const savedProjects = localStorage.getItem("projects")
let projects = defaultProjects.slice()

// 项目 DOM：筛选、表单、按钮和提示区域。
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
            // 旧数据迁移：给没有 id 的历史项目补上 id。
            projects = parseProject.map(function (project, index) {
                if (project.id === undefined) {
                    project.id = "saved-project-" + index + "-" + Date.now().toString()
                }
                return project
            })
            saveProjects()
        } else {
            localStorage.removeItem("projects")
        }
    }
} catch {
    localStorage.removeItem("projects")
}

/* ========== 7. 项目模块：存储和渲染 ========== */
// 保存项目列表到 localStorage。
function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projects))
}

// 渲染项目卡片、项目操作按钮和技术标签。
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
        const skillNum = createTextElement("p", `使用技术数量: ${project.techs.length}`, "project-meta")
        const techsText = project.techs.join("、")
        const textStr = createTextElement("p", `技术栈: ${techsText}`, "project-techs-text")

        const actions = document.createElement("div")
        actions.classList.add("project-actions")
        const deleteButton = createTextElement("button", "删除项目", "")
        deleteButton.type = "button"
        deleteButton.classList.add("danger-button")
        const editButton = createTextElement("button", "编辑项目", "")
        editButton.type = "button"
        editButton.classList.add("secondary-button")

        actions.appendChild(editButton)
        actions.appendChild(deleteButton)

        article.appendChild(title)
        article.appendChild(desc)
        article.appendChild(skillNum)
        article.appendChild(textStr)
        article.appendChild(actions)

        deleteButton.addEventListener("click", function () {
            deleteProject(project.id)
        })

        editButton.addEventListener("click", function () {
            editProjectButton.textContent = "保存编辑"
            startEditProject(project.id)
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

// 生成技术筛选下拉框。
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
// 按技术栈筛选项目。
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

// 点击编辑按钮后，把项目内容回填到表单里。
function startEditProject(projectId) {
    const targetProject = projects.find(function (project) {
        return project.id === projectId
    })
    if (targetProject === undefined) {
        return
    }
    editDesc.textContent = `正在编辑 ${targetProject.title}`
    editingProjectID = targetProject.id
    projectTitle.value = targetProject.title
    projectDesc.value = targetProject.desc
    projectTechs.value = targetProject.techs.join(",")
}

// 提交表单：没有编辑 id 时新增项目，有编辑 id 时保存修改。
addProject.addEventListener("submit", function (event) {
    event.preventDefault()
    const title = projectTitle.value.trim()
    const desc = projectDesc.value.trim()
    const techs = projectTechs.value.trim()
    const techsString = techs.split(",")
        .map(function (tech) {
            return tech.trim()
        })
        .filter(function (tech) {
            return tech !== ""
        })

    if (editingProjectID === "") {
        if (isProjectFrom(title, desc, techsString)) {
            const newProject = {
                id: Date.now().toString(),
                title: title,
                desc: desc,
                techs: techsString
            }
            projects.push(newProject)
            refreshProjects()
            editDesc.textContent = "添加项目成功"
            cleanProjectFrom()
        } else {
            editDesc.textContent = "您添加的项目有误"
        }
    } else {
        if (isProjectFrom(title, desc, techsString)) {
            const targetProject = projects.find(function (project) {
                return project.id === editingProjectID
            })
            if (targetProject === undefined) {
                return
            }

            targetProject.title = title
            targetProject.desc = desc
            targetProject.techs = techsString

            rbarckText()
            refreshProjects()
            editDesc.textContent = "项目编辑成功"
            cleanProjectFrom()
        } else {
            editDesc.textContent = "项目编辑失败"
        }
    }
})

// 清空按钮：退出编辑状态，并清空表单内容。
cleanButton.addEventListener("click", function () {
    rbarckText()
    cleanProjectFrom()
    editDesc.textContent = "已退出编辑"
})

// 删除项目。
function deleteProject(projectId) {
    const isOk = confirm("确定需要删除该项目吗？")

    if (!isOk) {
        return
    }

    projects = projects.filter(function (project) {
        return project.id !== projectId
    })
    refreshProjects()
}

/* ========== 9. 项目模块：表单辅助函数和初始化 ========== */
// 清除项目表单数据。
function cleanProjectFrom() {
    projectTitle.value = ""
    projectDesc.value = ""
    projectTechs.value = ""
}

// 退出编辑状态，并把提交按钮文字恢复为“添加项目”。
function rbarckText() {
    editingProjectID = ""

    editProjectButton.textContent = "添加项目"
}

// 判断项目表单是否填写完整。
function isProjectFrom(title, desc, techsArray) {
    return title !== "" && desc !== "" && techsArray.length > 0
}

// 封装项目保存与刷新流程。
function refreshProjects() {
    saveProjects()
    renderTechFilterOptions()
    renderProjects(projects)
}

renderTechFilterOptions()
renderProjects(projects)
