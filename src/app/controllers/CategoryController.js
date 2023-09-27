const CaregoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
    async index(request, response) {
        const categories = await CaregoriesRepository.findAll();
        response.json(categories);
    }

    async store(request, response) {
        const { name } = request.body;

        if (!name) {
            return response.status(400).json({ error: 'Preencher o nome é obrigatório.' });
        }

        const category = await CaregoriesRepository.create({ name });
        response.json(category);
    }
    async delete(request, response) {
        const { id } = request.params;

        await CaregoriesRepository.delete(id);
        response.sendStatus(204);
    }
}

module.exports = new CategoryController();
