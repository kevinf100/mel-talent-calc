import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target directory for the actual project
const targetDir = path.join(__dirname, 'src', 'core', 'data');

// Get all class directories
function getClassDirs() {
    try {
        return fs.readdirSync(targetDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
    } catch (error) {
        console.error(`❌ Error reading target directory: ${targetDir}`);
        console.error(error.message);
        return [];
    }
}

function addTreeTypes() {
    console.log('🎯 ADDING TREE TYPE ANNOTATIONS');
    console.log(`📁 Target directory: ${targetDir}`);
    console.log('Adding "import type { Tree } from \'../../types\'" and ": Tree" annotations\n');
    console.log('='.repeat(60));

    const classDirs = getClassDirs();
    if (classDirs.length === 0) {
        console.log('❌ No class directories found!');
        return;
    }

    let updatedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    classDirs.forEach(className => {
        const classDir = path.join(targetDir, className);

        // Get all spec files (non-raw files)
        let specFiles;
        try {
            specFiles = fs.readdirSync(classDir)
                .filter(file => file.endsWith('.ts') && !file.startsWith('raw_'));
        } catch (error) {
            console.log(`❌ Error reading ${className} directory: ${error.message}`);
            errorCount++;
            return;
        }

        if (specFiles.length === 0) {
            return;
        }

        console.log(`\n${className.toUpperCase()}:`);

        specFiles.forEach(specFile => {
            const specName = specFile.replace('.ts', '');
            const specFilePath = path.join(classDir, specFile);

            try {
                // Read the existing TS file
                const tsContent = fs.readFileSync(specFilePath, 'utf8');
                
                // Check if it already has the import and type annotation
                const hasImport = tsContent.includes('import type { Tree }');
                const hasTypeAnnotation = tsContent.includes(': Tree');
                
                if (hasImport && hasTypeAnnotation) {
                    console.log(`  ✅ ${specName}: Already has Tree type annotation`);
                    skippedCount++;
                    return;
                }

                // Parse the export line
                const exportMatch = tsContent.match(/export const (\w+)(?:: \w+)? = ({[\s\S]*});?/);
                if (!exportMatch) {
                    console.log(`  ❌ ${specName}: Could not parse export`);
                    errorCount++;
                    return;
                }

                const exportName = exportMatch[1];
                const objectContent = exportMatch[2];

                // Create the updated content
                let updatedContent = '';
                
                // Add import if not present
                if (!hasImport) {
                    updatedContent += `import type { Tree } from '../../types';\n\n`;
                }
                
                // Add export with type annotation
                updatedContent += `export const ${exportName}: Tree = ${objectContent};`;

                // Write the updated file
                fs.writeFileSync(specFilePath, updatedContent);
                
                console.log(`  🎯 ${specName}: Added Tree type annotation`);
                updatedCount++;

            } catch (error) {
                console.log(`  ❌ ${specName}: Error - ${error.message}`);
                errorCount++;
            }
        });
    });

    console.log('\n' + '='.repeat(60));
    console.log('📊 UPDATE SUMMARY:');
    console.log(`🎯 Files updated: ${updatedCount}`);
    console.log(`✅ Files already correct: ${skippedCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log('='.repeat(60));
    
    if (updatedCount > 0) {
        console.log('\n🚀 SUCCESS: Tree type annotations added to spec files!');
    }
}

// Execute the update
addTreeTypes();
